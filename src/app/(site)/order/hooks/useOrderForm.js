'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { countryCodes, domains, services } from '@/lib/data';
import { maxFiles } from '@/lib/config/order';
import { logError } from '@/lib/logger';
import { filterValidFiles } from '../lib/files';

const INITIAL_FORM = {
  name: '', contactType: 'whatsapp', countryIso: 'pk', phone: '', email: '',
  domainId: '', serviceId: '', customService: '',
  subject: '', description: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STORAGE_BUCKET = 'inquiry-files';

// Owns the entire order form: field state, attachment handling, validation, and
// the signed-URL upload → submit-order orchestration. The form components are
// purely presentational and read everything they need from this hook.
export function useOrderForm() {
  const searchParams = useSearchParams();
  const serviceQuery = searchParams.get('service');
  const domainQuery  = searchParams.get('domain');

  const [formData,     setFormData]     = useState(INITIAL_FORM);
  const [attachments,  setAttachments]  = useState([]);
  const [dragOver,     setDragOver]     = useState(false);
  const [fileError,    setFileError]    = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted,  setIsSubmitted]  = useState(false);
  const [submitError,  setSubmitError]  = useState('');
  const [errors,       setErrors]       = useState({});

  const fileInputRef = useRef(null);

  const selectedCountry = countryCodes.find(c => c.iso === formData.countryIso) ?? countryCodes[0];

  // Sync URL query params → form fields
  useEffect(() => {
    if (serviceQuery) {
      const s = services.find(x => x.id === serviceQuery);
      if (s) setFormData(prev => ({ ...prev, serviceId: s.id }));
    }
    if (domainQuery) {
      const d = domains.find(x => x.id === domainQuery);
      if (d) setFormData(prev => ({ ...prev, domainId: d.id }));
    }
  }, [serviceQuery, domainQuery]);

  // ─── Field helpers ──────────────────────────────────────────────────────────

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const setCountryIso = (iso) => setFormData(prev => ({ ...prev, countryIso: iso }));

  const setContactType = (type) => {
    setFormData(prev => ({ ...prev, contactType: type }));
    // Clear errors for the other contact method when toggling
    setErrors(prev => ({ ...prev, phone: null, email: null }));
  };

  const setServiceId = (value) => {
    setFormData(prev => ({ ...prev, serviceId: value, customService: '' }));
    if (errors.serviceId) setErrors(prev => ({ ...prev, serviceId: null, customService: null }));
  };

  // ─── File handling ────────────────────────────────────────────────────────────

  const processFiles = (incoming) => {
    const { valid, error } = filterValidFiles(incoming);
    setFileError(error);
    setAttachments(prev => {
      const combined = [...prev, ...valid];
      if (combined.length > maxFiles) {
        setFileError(`You can attach up to ${maxFiles} files only.`);
        return combined.slice(0, maxFiles);
      }
      return combined;
    });
  };

  const handleFileInput = (e) => processFiles(Array.from(e.target.files));
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    processFiles(Array.from(e.dataTransfer.files));
  };
  const removeFile = (idx) => setAttachments(prev => prev.filter((_, i) => i !== idx));

  // ─── Validation & submit ────────────────────────────────────────────────────

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2)
      errs.name = 'Name must be at least 2 characters.';
    if (formData.contactType === 'whatsapp') {
      if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 6)
        errs.phone = 'Please enter a valid phone / WhatsApp number.';
    } else {
      if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim()))
        errs.email = 'Please enter a valid email address.';
    }
    if (!formData.domainId)
      errs.domainId = 'Please select your academic domain.';
    if (!formData.serviceId) {
      errs.serviceId = 'Please select a service type.';
    } else if (formData.serviceId === 'other' && !formData.customService.trim()) {
      errs.customService = 'Please describe your service.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 2)
      errs.subject = 'Please enter your subject / course name.';
    if (!formData.description.trim() || formData.description.trim().length < 10)
      errs.description = 'Description must be at least 10 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const uploadAttachments = async () => {
    if (attachments.length === 0) return { paths: [], rateLimited: false };

    const urlRes = await fetch('/api/create-upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        files: attachments.map(f => ({ name: f.name, size: f.size, type: f.type })),
      }),
    });

    if (urlRes.status === 429) {
      const data = await urlRes.json().catch(() => ({}));
      setSubmitError(data.error || 'Too many upload attempts. Please try again later.');
      return { paths: [], rateLimited: true };
    }
    if (!urlRes.ok) {
      const data = await urlRes.json().catch(() => ({}));
      throw new Error(data.error || 'Could not prepare file upload.');
    }

    // Upload each file to its one-time signed URL. Files are never written to
    // Storage directly — every upload is authorized by the server-minted token.
    const { uploads } = await urlRes.json();
    const paths = [];
    for (let i = 0; i < attachments.length; i++) {
      const { path, token } = uploads[i];
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .uploadToSignedUrl(path, token, attachments[i]);
      if (uploadError) throw uploadError;
      // Store the PATH (not a public URL) — the bucket is private and signed
      // URLs are generated on-demand in the admin dashboard.
      paths.push(path);
    }
    return { paths, rateLimited: false };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      if (formData.contactType === 'whatsapp') {
        const valRes = await fetch('/api/validate-whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: formData.phone.trim(),
            country_dial: selectedCountry.dial,
          }),
        });

        if (valRes.status === 429) {
          const data = await valRes.json().catch(() => ({}));
          setSubmitError(data.error || 'Too many verification attempts. Please try again later.');
          return;
        }

        const valData = await valRes.json().catch(() => ({}));
        if (!valRes.ok) {
          if (valRes.status === 400 && valData.error) {
            setErrors(prev => ({ ...prev, phone: valData.error }));
            return;
          }
          throw new Error(valData.error || 'Could not verify WhatsApp number.');
        }
      }

      const { paths, rateLimited } = await uploadAttachments();
      if (rateLimited) return;

      const isEmail = formData.contactType === 'email';
      const res = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submitted_at:   new Date().toISOString(),
          name:           formData.name.trim(),
          phone:          isEmail ? '' : formData.phone.trim(),
          country_dial:   isEmail ? '' : selectedCountry.dial,
          country_iso:    isEmail ? '' : formData.countryIso,
          country_name:   isEmail ? '' : selectedCountry.name,
          contact_type:   formData.contactType,
          contact:        isEmail ? formData.email.trim() : null,
          domain_id:      formData.domainId,
          service_id:     formData.serviceId,
          custom_service: formData.customService.trim(),
          subject:        formData.subject.trim(),
          description:    formData.description.trim(),
          attachments:    paths,
        }),
      });

      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data.error || 'Too many submissions. Please try again later.');
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message = data.error || 'Submission failed.';
        if (res.status === 400 && !isEmail && data.error) {
          setErrors(prev => ({ ...prev, phone: data.error }));
          return;
        }
        throw new Error(message);
      }

      setIsSubmitted(true);
      setAttachments([]);
    } catch (err) {
      logError('order-submit', err);
      setSubmitError(err.message || 'Something went wrong while submitting your request. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData(INITIAL_FORM);
    setAttachments([]);
    setFileError('');
    setSubmitError('');
    setErrors({});
  };

  return {
    formData,
    errors,
    updateField,
    setCountryIso,
    setContactType,
    setServiceId,
    selectedCountry,
    attachments,
    dragOver,
    setDragOver,
    fileError,
    fileInputRef,
    handleFileInput,
    handleDrop,
    removeFile,
    isSubmitting,
    isSubmitted,
    submitError,
    handleSubmit,
    resetForm,
  };
}
