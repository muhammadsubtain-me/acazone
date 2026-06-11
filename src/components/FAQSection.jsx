import { Badge } from './ui/badge';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';

const faqs = [
  {
    q: 'How do I place an order or request a quote?',
    a: 'Simply click "Get a Free Quote" and fill in our 30-second form with your academic domain, deadline, and requirements. Our team will review the guidelines and send you a custom quote via email or WhatsApp within 15 minutes.',
  },
  {
    q: 'Is my personal information and order detail confidential?',
    a: 'Yes, absolutely. We enforce strict privacy protocols. Your personal name, email, school, and project details are encrypted and never shared. Tutors only see the blind assignment guidelines, and all final papers are delivered securely.',
  },
  {
    q: 'How fast can you complete my urgent assignment?',
    a: 'We offer express turnarounds as short as 12 to 24 hours for most assignments, lab tasks, and essay papers. If you have a critical deadline, we recommend reaching out via WhatsApp for immediate specialist matching.',
  },
  {
    q: 'Are your tutors and academic writers qualified?',
    a: 'Every tutor on our platform is thoroughly vetted, verifying both their identity and academic credentials. Our network consists of subject-matter specialists holding advanced degrees (Masters or PhDs) from accredited universities.',
  },
  {
    q: 'What is your revision policy if I need changes?',
    a: 'Your satisfaction is our absolute priority. We offer unlimited free revisions for 10 days after delivery. If the final file requires adjustments to meet your original instructions, our experts will modify it free of charge.',
  },
  {
    q: 'Is the completed work guaranteed to be plagiarism-free?',
    a: 'Yes. Every project, calculation sheet, code script, and report is custom-written from scratch. We run all submissions through leading academic integrity tools (like Turnitin). We can provide a free originality report upon request.',
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-[var(--color-surface)] relative overflow-hidden border-t border-[var(--color-border)]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-4">Common Questions</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-[var(--color-text-heading)]">
            Frequently Asked Questions
          </h2>
          <p className="text-[var(--color-text-muted)] text-[16px] max-w-2xl mx-auto">
            Everything you need to know about our workflow, security, timelines, and quality guarantees.
          </p>
        </div>

        <Accordion type="single" collapsible className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="rounded-xl border border-white/[0.06] overflow-hidden">
              <AccordionTrigger className="hover:bg-white/[0.01]">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent>
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
