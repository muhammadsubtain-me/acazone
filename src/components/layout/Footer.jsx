'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Logo from '@/components/layout/Logo';
import Container from '@/components/layout/Container';
import { cn } from '@/lib/utils';
import { contactMethods, domains, footerQuickLinks, paymentMethods, siteInfo, socialLinks, subjects } from '@/lib/data';
import { grids } from '@/lib/responsive';

const VISIBLE_SUBJECTS = 13;
const locationIcon = contactMethods.find((m) => m.id === 'address')?.icon;

export default function Footer() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const visibleSubjects = expanded ? subjects : subjects.slice(0, VISIBLE_SUBJECTS);

  const handleLogoClick = () => {
    if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--color-footer-bg)] text-[var(--color-footer-text)]">
      <Container className="py-12 sm:py-14 md:py-16 lg:py-20 xl:py-20 3xl:py-24">
        <div className={`${grids.footer} ${grids.gap}`}>

          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-4 w-fit no-underline relative -top-[2px]"
              onClick={handleLogoClick}
            >
              <Logo className="w-8 h-8" />
              <span className="text-[var(--color-footer-head)] font-bold text-lg sm:text-xl tracking-[-0.02em]">
                {siteInfo.name}
              </span>
            </Link>
            <p className="text-sm sm:text-base leading-[1.7] mb-6">
              {siteInfo.tagline}
            </p>
            <div className="text-sm sm:text-base leading-loose">
              <div className="flex gap-2">
                <span className="shrink-0 leading-[1.7]">{locationIcon}</span>
                <span>{siteInfo.address}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--color-footer-head)] mb-4 sm:mb-5 text-xs uppercase tracking-[0.08em]">Quick Links</h4>
            <ul className="list-none p-0 m-0">
              {footerQuickLinks.map((link) => (
                <li key={link.name} className="mb-2.5">
                  <Link
                    href={link.path}
                    className="text-sm text-[var(--color-footer-text)] no-underline transition-colors duration-150 hover:text-[var(--color-text)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--color-footer-head)] mb-4 sm:mb-5 text-xs uppercase tracking-[0.08em]">Domains</h4>
            <ul className="list-none p-0 m-0">
              {domains.map((domain) => (
                <li key={domain.id} className="mb-2.5">
                  <span className="text-sm text-[var(--color-footer-text)] transition-colors duration-150 hover:text-[var(--color-text)] cursor-default">
                    {domain.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-start">
            <h4 className="font-semibold text-[var(--color-footer-head)] mb-4 sm:mb-5 text-xs uppercase tracking-[0.08em]">Subjects We Cover</h4>
            <div className="flex flex-wrap gap-2 transition-all duration-300">
              {visibleSubjects.map((sub) => (
                <span
                  key={sub}
                  className="text-[11px] sm:text-xs bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1 rounded-lg text-[var(--color-footer-text)] cursor-default transition-all duration-150 hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
                >
                  {sub}
                </span>
              ))}
            </div>
            {subjects.length > VISIBLE_SUBJECTS && (
              <button
                onClick={() => setExpanded(e => !e)}
                className="mt-4 inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[var(--color-accent-muted)] hover:text-white transition-colors duration-150 cursor-pointer"
              >
                {expanded ? (
                  <>Show Less <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>Show More (+{subjects.length - VISIBLE_SUBJECTS} more) <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6">
          {paymentMethods.map((method) => (
            <img
              key={method.name}
              src={method.logo}
              alt={method.name}
              title={method.name}
              className={cn(
                'object-contain shrink-0',
                method.imageClass ?? 'h-8 sm:h-9 md:h-10 w-[88px] sm:w-[96px] md:w-[104px]',
              )}
              loading="lazy"
            />
          ))}
        </div>

        <Separator className="my-8 sm:my-10 lg:my-12" />

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm m-0">{siteInfo.copyright}</p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="w-8 h-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl flex items-center justify-center text-xs font-bold text-[var(--color-footer-text)] no-underline transition-all duration-200 hover:bg-[var(--color-surface-3)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-heading)]"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
