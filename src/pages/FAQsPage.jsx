import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components/ui/accordion';
import PageHero from '../components/PageHero';
import { faqs } from '../lib/contentData';

export default function FAQsPage() {
  return (
    <div className="min-h-screen">
      <PageHero title="Frequently Asked Questions" subtitle="Everything you need to know about ZenEdify's services." />
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Card className="mt-12 p-8 text-center">
            <h3 className="font-display text-xl font-bold mb-2 text-[var(--color-text-heading)]">Still have questions?</h3>
            <p className="text-[var(--color-text-muted)] text-sm mb-5">Our support team is available 24/7 to help with any queries.</p>
            <Button asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
