import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PageHero from '@/components/PageHero';
import { domains, services } from '@/lib/contentData';

function Select({ className, children, ...props }) {
  return (
    <div className="relative w-full">
      <select
        className="flex w-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3 pr-10 text-sm text-[var(--color-text)] outline-none transition-all focus:border-[var(--color-border-focus)] disabled:cursor-not-allowed disabled:opacity-50 rounded-xl appearance-none cursor-pointer"
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[var(--color-text-muted)]">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
}

export default function OrderPage() {
  const [searchParams] = useSearchParams();
  const serviceQuery = searchParams.get('service');
  const domainQuery = searchParams.get('domain');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domainId: '',
    serviceId: '',
    subject: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Sync with query params if they change
  useEffect(() => {
    if (serviceQuery) {
      const s = services.find(x => x.id === serviceQuery);
      if (s) {
        setFormData(prev => ({ ...prev, serviceId: s.id }));
      }
    }
    if (domainQuery) {
      const d = domains.find(x => x.id === domainQuery);
      if (d) {
        setFormData(prev => ({ ...prev, domainId: d.id }));
      }
    }
  }, [serviceQuery, domainQuery]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.domainId) {
      newErrors.domainId = 'Please select your academic domain.';
    }
    if (!formData.serviceId) {
      newErrors.serviceId = 'Please select a service type.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 2) {
      newErrors.subject = 'Please enter your subject / course name.';
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const selectedServiceObj = services.find(s => s.id === formData.serviceId);

  return (
    <div className="min-h-screen">
      <PageHero title="Hire Expert" subtitle="Submit your requirements below and get a free quote within 15 minutes." />
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Card className="p-6 md:p-8 bg-[var(--color-surface-2)] border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
            {isSubmitted ? (
              <div className="text-center py-10 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                  ✓
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-[var(--color-text-heading)]">
                  Order Request Received!
                </h3>
                <p className="text-[var(--color-text-muted)] text-[15px] leading-relaxed max-w-md mx-auto mb-8">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Our expert support team has received your request for <strong className="text-white">{formData.subject}</strong> ({selectedServiceObj?.name || 'General Help'}) and is matching you with a specialist.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-[var(--color-text-faint)] max-w-sm mx-auto mb-8">
                  A quote has been prepared and sent to <span className="text-white font-semibold">{formData.email}</span>. We will contact you in under 15 minutes.
                </div>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', domainId: '', serviceId: '', subject: '', description: '' });
                    setErrors({});
                  }}
                >
                  Place Another Order
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                {/* 2-Column Grid for Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Input
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors(prev => ({ ...prev, name: null }));
                      }}
                      className={errors.name ? 'border-red-500/50 focus:border-red-500' : ''}
                    />
                    {errors.name && <span className="text-xs text-red-400 pl-1">{errors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                      }}
                      className={errors.email ? 'border-red-500/50 focus:border-red-500' : ''}
                    />
                    {errors.email && <span className="text-xs text-red-400 pl-1">{errors.email}</span>}
                  </div>
                </div>

                {/* 2-Column Grid for Academic Domain & Service Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Select
                      value={formData.domainId}
                      onChange={(e) => {
                        setFormData({ ...formData, domainId: e.target.value });
                        if (errors.domainId) setErrors(prev => ({ ...prev, domainId: null }));
                      }}
                      className={errors.domainId ? 'border-red-500/50 focus:border-red-500' : ''}
                    >
                      <option value="">Select Academic Domain</option>
                      {domains.map((d) => (
                        <option key={d.id} value={d.id} className="bg-[var(--color-surface)] text-[var(--color-text)]">
                          {d.name}
                        </option>
                      ))}
                    </Select>
                    {errors.domainId && <span className="text-xs text-red-400 pl-1">{errors.domainId}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Select
                      value={formData.serviceId}
                      onChange={(e) => {
                        setFormData({ ...formData, serviceId: e.target.value });
                        if (errors.serviceId) setErrors(prev => ({ ...prev, serviceId: null }));
                      }}
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
                  </div>
                </div>

                {/* Always-visible text input for Subject / Course */}
                <div className="flex flex-col gap-1.5">
                  <Input
                    required
                    placeholder="Subject / Course (e.g., Thermodynamics, DSA, Circuit Analysis)"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors(prev => ({ ...prev, subject: null }));
                    }}
                    className={errors.subject ? 'border-red-500/50 focus:border-red-500' : ''}
                  />
                  {errors.subject && <span className="text-xs text-red-400 pl-1">{errors.subject}</span>}
                </div>

                {/* Textarea Description */}
                <div className="flex flex-col gap-1.5">
                  <Textarea
                    required
                    rows={3}
                    placeholder="Briefly describe your assignment details or requirements..."
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value });
                      if (errors.description) setErrors(prev => ({ ...prev, description: null }));
                    }}
                    className={`resize-y min-h-[90px] ${errors.description ? 'border-red-500/50 focus:border-red-500' : ''}`}
                  />
                  {errors.description && <span className="text-xs text-red-400 pl-1">{errors.description}</span>}
                </div>

                {/* Submit button */}
                <div className="flex justify-start pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 self-start"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Submit Request'}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
}
