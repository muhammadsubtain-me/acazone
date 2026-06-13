import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import PageHero from '../components/PageHero';
import { domains, services } from '../lib/contentData';

export default function OrderPage() {
  const [searchParams] = useSearchParams();
  const serviceQuery = searchParams.get('service');
  const domainQuery = searchParams.get('domain');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    courseName: '',
    projectTitle: '',
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
        setFormData(prev => ({ ...prev, projectTitle: s.name }));
      }
    }
    if (domainQuery) {
      const d = domains.find(x => x.id === domainQuery);
      if (d) {
        setFormData(prev => ({ ...prev, courseName: d.name }));
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
    if (!formData.courseName.trim() || formData.courseName.trim().length < 3) {
      newErrors.courseName = 'Course name must be at least 3 characters.';
    }
    if (!formData.projectTitle.trim() || formData.projectTitle.trim().length < 3) {
      newErrors.projectTitle = 'Project title must be at least 3 characters.';
    }
    if (!formData.description.trim() || formData.description.trim().length < 15) {
      newErrors.description = 'Description must be at least 15 characters.';
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

  return (
    <div className="min-h-screen">
      <PageHero title="Hire Expert" subtitle="Submit your requirements below and get a free quote within 15 minutes." />
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Card className="p-8 md:p-10 bg-[var(--color-surface-2)] border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
            {isSubmitted ? (
              <div className="text-center py-10 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                  ✓
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-[var(--color-text-heading)]">
                  Order Request Received!
                </h3>
                <p className="text-[var(--color-text-muted)] text-[15px] leading-relaxed max-w-md mx-auto mb-8">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Our expert support team has received your request for <strong className="text-white">{formData.projectTitle || 'your project'}</strong> and is matching you with a specialist.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-[var(--color-text-faint)] max-w-sm mx-auto mb-8">
                  A quote has been prepared and sent to <span className="text-white font-semibold">{formData.email}</span>. We will contact you in under 15 minutes.
                </div>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', courseName: '', projectTitle: '', description: '' });
                    setErrors({});
                  }}
                >
                  Place Another Order
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
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
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                    }}
                    className={errors.email ? 'border-red-500/50 focus:border-red-500' : ''}
                  />
                  {errors.email && <span className="text-xs text-red-400 pl-1">{errors.email}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Input
                    required
                    placeholder="Course Name"
                    value={formData.courseName}
                    onChange={(e) => {
                      setFormData({ ...formData, courseName: e.target.value });
                      if (errors.courseName) setErrors(prev => ({ ...prev, courseName: null }));
                    }}
                    className={errors.courseName ? 'border-red-500/50 focus:border-red-500' : ''}
                  />
                  {errors.courseName && <span className="text-xs text-red-400 pl-1">{errors.courseName}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Input
                    required
                    placeholder="Project Title"
                    value={formData.projectTitle}
                    onChange={(e) => {
                      setFormData({ ...formData, projectTitle: e.target.value });
                      if (errors.projectTitle) setErrors(prev => ({ ...prev, projectTitle: null }));
                    }}
                    className={errors.projectTitle ? 'border-red-500/50 focus:border-red-500' : ''}
                  />
                  {errors.projectTitle && <span className="text-xs text-red-400 pl-1">{errors.projectTitle}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Textarea
                    required
                    rows={4}
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value });
                      if (errors.description) setErrors(prev => ({ ...prev, description: null }));
                    }}
                    className={`resize-y min-h-[120px] ${errors.description ? 'border-red-500/50 focus:border-red-500' : ''}`}
                  />
                  {errors.description && <span className="text-xs text-red-400 pl-1">{errors.description}</span>}
                </div>
                <div className="flex justify-start">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 self-start"
                  >
                    {isSubmitting ? 'Sending...' : 'Send'}
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
