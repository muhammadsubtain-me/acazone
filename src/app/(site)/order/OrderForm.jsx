'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { domains, services } from '@/lib/data';
import { useOrderForm } from './hooks/useOrderForm';
import Select from './components/Select';
import CountryDialSelect from './components/CountryDialSelect';
import AttachmentField from './components/AttachmentField';
import OrderSuccess from './components/OrderSuccess';

export default function OrderForm() {
  const {
    formData, errors, contactChecking, contactValid,
    updateField, setCountryIso, setContactType, setServiceId,
    handleEmailBlur, handlePhoneBlur,
    selectedCountry,
    attachments, dragOver, setDragOver, fileError, fileInputRef,
    handleFileInput, handleDrop, removeFile,
    isSubmitting, isSubmitted, submitError, handleSubmit, resetForm,
  } = useOrderForm();

  const selectedServiceObj = services.find(s => s.id === formData.serviceId);
  const serviceLabel = formData.serviceId === 'other'
    ? formData.customService
    : (selectedServiceObj?.name || 'General Help');

  return (
    <Card className="p-5 md:p-7 lg:p-8 xl:p-10 3xl:p-12 bg-[var(--color-surface-2)] border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
      {isSubmitted ? (
        <OrderSuccess
          name={formData.name}
          subject={formData.subject}
          serviceLabel={serviceLabel}
          contactType={formData.contactType}
          dial={selectedCountry.dial}
          phone={formData.phone}
          email={formData.email}
          onReset={resetForm}
        />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <Input
              required
              placeholder="Name"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className={errors.name ? 'border-red-500/50 focus:border-red-500' : ''}
            />
            {errors.name && <span className="text-xs text-red-400 pl-1">{errors.name}</span>}
          </div>

          {/* Contact Type Toggle + Input */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-[var(--color-border)] rounded-xl w-full sm:w-fit">
              <button
                type="button"
                onClick={() => setContactType('whatsapp')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  formData.contactType === 'whatsapp'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-transparent'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setContactType('email')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  formData.contactType === 'email'
                    ? 'bg-blue-500/15 text-blue-400 border border-blue-500/25 shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-transparent'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Email
              </button>
            </div>
            </div>

            {formData.contactType === 'whatsapp' ? (
              <div className="flex flex-col gap-1.5">
                <div className={`flex rounded-xl border transition-all overflow-visible ${
                  errors.phone
                    ? 'border-red-500/50'
                    : contactValid.phone
                      ? 'border-emerald-500/40 focus-within:border-emerald-500/50'
                      : 'border-[var(--color-border)] focus-within:border-[var(--color-border-focus)]'
                }`}>
                  <CountryDialSelect value={formData.countryIso} onChange={setCountryIso} />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp / Phone Number"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    onBlur={handlePhoneBlur}
                    className="flex-1 min-w-0 bg-[var(--color-surface-2)] px-3 py-3 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-faint)] rounded-r-xl"
                  />
                </div>
                {contactChecking && !errors.phone && (
                  <span className="text-xs text-[var(--color-text-muted)] pl-1">Checking WhatsApp number...</span>
                )}
                {errors.phone && <span className="text-xs text-red-400 pl-1">{errors.phone}</span>}
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <Input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  onBlur={handleEmailBlur}
                  className={
                    errors.email
                      ? 'border-red-500/50 focus:border-red-500'
                      : contactValid.email
                        ? 'border-emerald-500/40 focus:border-emerald-500/50'
                        : ''
                  }
                />
                {contactChecking && !errors.email && (
                  <span className="text-xs text-[var(--color-text-muted)] pl-1">Checking email address...</span>
                )}
                {errors.email && <span className="text-xs text-red-400 pl-1">{errors.email}</span>}
              </div>
            )}
          </div>

          {/* Academic Domain + Service Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="flex flex-col gap-1.5">
              <Select
                value={formData.domainId}
                onChange={(e) => updateField('domainId', e.target.value)}
                className={errors.domainId ? 'border-red-500/50 focus:border-red-500' : ''}
              >
                <option value="">Select Academic Domain</option>
                {domains.map((d) => (
                  <option key={d.id} value={d.id} className="bg-[var(--color-surface)] text-[var(--color-text)]">
                    {d.name}
                  </option>
                ))}
                <option value="other" className="bg-[var(--color-surface)] text-[var(--color-text)]">Other</option>
              </Select>
              {errors.domainId && <span className="text-xs text-red-400 pl-1">{errors.domainId}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Select
                value={formData.serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className={errors.serviceId ? 'border-red-500/50 focus:border-red-500' : ''}
              >
                <option value="">Select Service Needed</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id} className="bg-[var(--color-surface)] text-[var(--color-text)]">
                    {s.name}
                  </option>
                ))}
                <option value="other" className="bg-[var(--color-surface)] text-[var(--color-text)]">Other / Custom Service</option>
              </Select>
              {errors.serviceId && <span className="text-xs text-red-400 pl-1">{errors.serviceId}</span>}
              {formData.serviceId === 'other' && (
                <div className="mt-1">
                  <Input
                    required
                    placeholder="Describe the service you need"
                    value={formData.customService}
                    onChange={(e) => updateField('customService', e.target.value)}
                    className={errors.customService ? 'border-red-500/50 focus:border-red-500' : ''}
                  />
                  {errors.customService && <span className="text-xs text-red-400 pl-1">{errors.customService}</span>}
                </div>
              )}
            </div>
          </div>

          {/* Subject / Course */}
          <div className="flex flex-col gap-1.5">
            <Input
              required
              placeholder="Subject / Course (e.g., Thermodynamics, DSA, Circuit Analysis)"
              value={formData.subject}
              onChange={(e) => updateField('subject', e.target.value)}
              className={errors.subject ? 'border-red-500/50 focus:border-red-500' : ''}
            />
            {errors.subject && <span className="text-xs text-red-400 pl-1">{errors.subject}</span>}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <Textarea
              required
              rows={3}
              placeholder="Briefly describe your assignment details or requirements..."
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              className={`resize-y min-h-[90px] ${errors.description ? 'border-red-500/50 focus:border-red-500' : ''}`}
            />
            {errors.description && <span className="text-xs text-red-400 pl-1">{errors.description}</span>}
          </div>

          {/* File Attachment */}
          <AttachmentField
            attachments={attachments}
            fileError={fileError}
            dragOver={dragOver}
            setDragOver={setDragOver}
            fileInputRef={fileInputRef}
            onFileInput={handleFileInput}
            onDrop={handleDrop}
            onRemove={removeFile}
          />

          {/* Submit */}
          <div className="flex flex-col gap-3 pt-2">
            {submitError && (
              <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2.5 text-center leading-relaxed">
                {submitError}
              </p>
            )}
            <div className="flex justify-start">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto md:w-auto px-8 md:px-10 self-start"
              >
                {isSubmitting ? 'Sending Request...' : 'Submit Request'}
              </Button>
            </div>
          </div>

        </form>
      )}
    </Card>
  );
}
