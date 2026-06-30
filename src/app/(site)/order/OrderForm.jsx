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
    formData, errors, updateField, setCountryIso, setServiceId,
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
          dial={selectedCountry.dial}
          phone={formData.phone}
          onReset={resetForm}
        />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

          {/* Name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
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

            <div className="flex flex-col gap-1.5">
              <div className={`flex rounded-xl border transition-all overflow-visible ${
                errors.phone ? 'border-red-500/50' : 'border-[var(--color-border)] focus-within:border-[var(--color-border-focus)]'
              }`}>
                <CountryDialSelect value={formData.countryIso} onChange={setCountryIso} />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp / Phone Number"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="flex-1 min-w-0 bg-[var(--color-surface-2)] px-3 py-3 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-faint)] rounded-r-xl"
                />
              </div>
              {errors.phone && <span className="text-xs text-red-400 pl-1">{errors.phone}</span>}
            </div>
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
