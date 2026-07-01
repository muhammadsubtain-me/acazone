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
const DEBOUNCE_MS = 600;
const MIN_PHONE_DIGITS = 6;

const STORAGE_BUCKET = 'inquiry-files';

function phoneDigits(phone) {
  return (phone || '').replace(/\D/g, '');
}

function isEmailComplete(email) {
  const trimmed = email.trim();
  return trimmed.includes('@') && trimmed.includes('.') && EMAIL_REGEX.test(trimmed);
}

async function fetchValidateEmail(email, signal) {
  const res = await fetch('/api/validate-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim() }),
    signal,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function fetchValidateWhatsApp(phone, countryDial, signal) {
  const res = await fetch('/api/validate-whatsapp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: phone.trim(), country_dial: countryDial }),
    signal,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

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
  const [errors,          setErrors]          = useState({});
  const [contactChecking, setContactChecking] = useState(false);
  const [contactValid,    setContactValid]    = useState({ email: false, phone: false });

  const fileInputRef = useRef(null);
  const emailTouchedRef = useRef(false);
  const phoneTouchedRef = useRef(false);
  const emailAbortRef = useRef(null);
  const phoneAbortRef = useRef(null);

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

  // ─── Debounced contact verification (email + WhatsApp) ──────────────────────

  useEffect(() => {
    if (formData.contactType !== 'email') return;

    const email = formData.email.trim();

    if (!email) {
      setContactValid(prev => ({ ...prev, email: false }));
      return;
    }

    if (!email.includes('@')) return;

    if (!isEmailComplete(email)) {
      if (emailTouchedRef.current) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
      }
      setContactValid(prev => ({ ...prev, email: false }));
      return;
    }

    const timer = setTimeout(async () => {
      emailAbortRef.current?.abort();
      const controller = new AbortController();
      emailAbortRef.current = controller;

      setContactChecking(true);
      try {
        const { ok, status, data } = await fetchValidateEmail(email, controller.signal);
        if (controller.signal.aborted) return;

        if (status === 429) {
          setErrors(prev => ({
            ...prev,
            email: data.error || 'Too many verification attempts. Please try again later.',
          }));
          setContactValid(prev => ({ ...prev, email: false }));
          return;
        }

        if (ok) {
          setErrors(prev => ({ ...prev, email: null }));
          setContactValid(prev => ({ ...prev, email: true }));
          return;
        }

        if (status === 400 && data.error) {
          setErrors(prev => ({ ...prev, email: data.error }));
          setContactValid(prev => ({ ...prev, email: false }));
          return;
        }

        if (emailTouchedRef.current) {
          setErrors(prev => ({
            ...prev,
            email: data.error || 'Could not verify email address. Please try again in a moment.',
          }));
        }
        setContactValid(prev => ({ ...prev, email: false }));
      } catch (err) {
        if (err.name === 'AbortError') return;
        logError('order-email-verify', err);
        if (emailTouchedRef.current) {
          setErrors(prev => ({
            ...prev,
            email: 'Could not verify email address. Please try again.',
          }));
        }
        setContactValid(prev => ({ ...prev, email: false }));
      } finally {
        if (!controller.signal.aborted) setContactChecking(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [formData.email, formData.contactType]);

  useEffect(() => {
    if (formData.contactType !== 'whatsapp') return;

    const phone = formData.phone.trim();
    const digits = phoneDigits(phone);

    if (digits.length < MIN_PHONE_DIGITS) {
      if (phoneTouchedRef.current && phone) {
        setErrors(prev => ({
          ...prev,
          phone: 'Please enter a valid phone / WhatsApp number.',
        }));
      }
      setContactValid(prev => ({ ...prev, phone: false }));
      return;
    }

    const dial = selectedCountry.dial;

    const timer = setTimeout(async () => {
      phoneAbortRef.current?.abort();
      const controller = new AbortController();
      phoneAbortRef.current = controller;

      setContactChecking(true);
      try {
        const { ok, status, data } = await fetchValidateWhatsApp(phone, dial, controller.signal);
        if (controller.signal.aborted) return;

        if (status === 429) {
          setErrors(prev => ({
            ...prev,
            phone: data.error || 'Too many verification attempts. Please try again later.',
          }));
          setContactValid(prev => ({ ...prev, phone: false }));
          return;
        }

        if (ok) {
          setErrors(prev => ({ ...prev, phone: null }));
          setContactValid(prev => ({ ...prev, phone: true }));
          return;
        }

        if (status === 400 && data.error) {
          setErrors(prev => ({ ...prev, phone: data.error }));
          setContactValid(prev => ({ ...prev, phone: false }));
          return;
        }

        if (phoneTouchedRef.current) {
          setErrors(prev => ({
            ...prev,
            phone: data.error || 'Could not verify WhatsApp number. Please try again in a moment.',
          }));
        }
        setContactValid(prev => ({ ...prev, phone: false }));
      } catch (err) {
        if (err.name === 'AbortError') return;
        logError('order-phone-verify', err);
        if (phoneTouchedRef.current) {
          setErrors(prev => ({
            ...prev,
            phone: 'Could not verify WhatsApp number. Please try again.',
          }));
        }
        setContactValid(prev => ({ ...prev, phone: false }));
      } finally {
        if (!controller.signal.aborted) setContactChecking(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [formData.phone, formData.countryIso, formData.contactType, selectedCountry.dial]);

  // ─── Field helpers ──────────────────────────────────────────────────────────

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    if (field === 'email') setContactValid(prev => ({ ...prev, email: false }));
    if (field === 'phone') setContactValid(prev => ({ ...prev, phone: false }));
  };

  const setCountryIso = (iso) => {
    setFormData(prev => ({ ...prev, countryIso: iso }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
    setContactValid(prev => ({ ...prev, phone: false }));
  };

  const setContactType = (type) => {
    emailAbortRef.current?.abort();
    phoneAbortRef.current?.abort();
    setFormData(prev => ({ ...prev, contactType: type }));
    setErrors(prev => ({ ...prev, phone: null, email: null }));
    setContactValid({ email: false, phone: false });
    setContactChecking(false);
  };

  const handleEmailBlur = () => {
    emailTouchedRef.current = true;
    const email = formData.email.trim();
    if (!email || !EMAIL_REGEX.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
      setContactValid(prev => ({ ...prev, email: false }));
    }
  };

  const handlePhoneBlur = () => {
    phoneTouchedRef.current = true;
    const phone = formData.phone.trim();
    if (!phone || phoneDigits(phone).length < MIN_PHONE_DIGITS) {
      setErrors(prev => ({
        ...prev,
        phone: 'Please enter a valid phone / WhatsApp number.',
      }));
      setContactValid(prev => ({ ...prev, phone: false }));
    }
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

  const verifyContactBeforeSubmit = async () => {
    const isEmail = formData.contactType === 'email';

    if (isEmail) {
      if (contactValid.email) return true;

      const email = formData.email.trim();
      const { ok, status, data } = await fetchValidateEmail(email);

      if (status === 429) {
        setSubmitError(data.error || 'Too many verification attempts. Please try again later.');
        return false;
      }
      if (ok) {
        setContactValid(prev => ({ ...prev, email: true }));
        setErrors(prev => ({ ...prev, email: null }));
        return true;
      }
      if (status === 400 && data.error) {
        setErrors(prev => ({ ...prev, email: data.error }));
        return false;
      }
      throw new Error(data.error || 'Could not verify email address.');
    }

    if (contactValid.phone) return true;

    const { ok, status, data } = await fetchValidateWhatsApp(
      formData.phone.trim(),
      selectedCountry.dial,
    );

    if (status === 429) {
      setSubmitError(data.error || 'Too many verification attempts. Please try again later.');
      return false;
    }
    if (ok) {
      setContactValid(prev => ({ ...prev, phone: true }));
      setErrors(prev => ({ ...prev, phone: null }));
      return true;
    }
    if (status === 400 && data.error) {
      setErrors(prev => ({ ...prev, phone: data.error }));
      return false;
    }
    throw new Error(data.error || 'Could not verify WhatsApp number.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (contactChecking) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const contactOk = await verifyContactBeforeSubmit();
      if (!contactOk) return;

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
        if (res.status === 400 && data.error) {
          setErrors(prev => ({
            ...prev,
            [isEmail ? 'email' : 'phone']: data.error,
          }));
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
    emailAbortRef.current?.abort();
    phoneAbortRef.current?.abort();
    emailTouchedRef.current = false;
    phoneTouchedRef.current = false;
    setIsSubmitted(false);
    setFormData(INITIAL_FORM);
    setAttachments([]);
    setFileError('');
    setSubmitError('');
    setErrors({});
    setContactValid({ email: false, phone: false });
    setContactChecking(false);
  };

  return {
    formData,
    errors,
    contactChecking,
    contactValid,
    updateField,
    setCountryIso,
    setContactType,
    setServiceId,
    handleEmailBlur,
    handlePhoneBlur,
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
