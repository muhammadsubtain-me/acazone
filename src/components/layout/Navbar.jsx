'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/layout/Logo';
import Container from '@/components/layout/Container';
import { mainNavLinks } from '@/lib/data';
import { layout } from '@/lib/responsive';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (link) =>
    link.name === 'Services'
      ? pathname.startsWith('/services')
      : pathname === link.path;

  const handleLogoClick = () => {
    if (isHomePage) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isHomePage
            ? scrolled || mobileOpen
              ? 'bg-black/30 backdrop-blur-[24px] backdrop-saturate-[180%] border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-transparent border-b border-transparent shadow-none'
            : 'bg-[#161616]/90 backdrop-blur-[24px] backdrop-saturate-[180%] border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
        }`}
      >
        <div
          className={`absolute top-0 left-0 right-0 h-px transition-opacity duration-500 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_30%,rgba(255,255,255,0.35)_50%,rgba(255,255,255,0.2)_70%,transparent_100%)] ${
            !isHomePage || scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <Container>
          <div className={`flex items-center ${layout.navHeight}`}>
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 no-underline" onClick={handleLogoClick}>
              <Logo className="w-7 h-7 sm:w-8 sm:h-8 relative -top-[1.5px]" />
              <span className="text-[var(--color-text-heading)] font-bold text-lg sm:text-xl tracking-[-0.02em]">
                Acezon
              </span>
            </Link>

            <nav className="hidden lg:flex xl:gap-1 items-center gap-0.5 ml-auto">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-3 xl:px-4 py-2 text-sm font-medium no-underline transition-all duration-150 ${
                    isActive(link) ? 'text-white' : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild size="sm" className="ml-2 xl:ml-3">
                <Link href="/order">Hire Expert</Link>
              </Button>
            </nav>

            <button
              className={`lg:hidden ml-auto w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
                scrolled ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10'
              }`}
              onClick={() => setMobileOpen(o => !o)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </Container>
      </header>

      {mobileOpen && (
        <nav className={`fixed ${layout.mobileMenuTop} left-0 right-0 bottom-0 z-40 px-4 sm:px-5 pb-24 pt-2 bg-[rgba(5,5,5,0.92)] backdrop-blur-[24px] backdrop-saturate-[180%] overflow-y-auto border-t border-white/[0.08]`}>
          {mainNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 text-sm font-medium no-underline transition-all duration-150 ${
                isActive(link) ? 'text-white' : 'text-[var(--color-text-muted)] hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 px-1">
            <Button asChild className="w-full">
              <Link href="/order" onClick={() => setMobileOpen(false)}>Hire Expert</Link>
            </Button>
          </div>
        </nav>
      )}
    </>
  );
}
