export const siteInfo = {
  name: 'Acezon',
  url: 'https://www.acezon.app',
  tagline:
    'Expert academic assistance to help students achieve the grades they deserve. Available 24/7.',
  address: 'Islamabad, Pakistan',
  supportEmail: 'support@acezon.com',
  supportPhones: ['+92 310 7459732', '+92 304 2335382'],
  // Numeric-only format required for wa.me links (no spaces or + sign)
  whatsappNumber: '923042335382',
  copyright: '© 2026 Acezon. All Rights Reserved.',
};

export const socialLinks = [
  { name: 'Facebook', icon: 'f', href: '#' },
  { name: 'Instagram', icon: 'ig', href: '#' },
  { name: 'Twitter', icon: 'X', href: '#' },
  { name: 'LinkedIn', icon: 'in', href: '#' },
  { name: 'YouTube', icon: '▶', href: '#' },
];

export const paymentMethods = [
  { name: 'Wise', logo: '/Payment%20Logos/wise.png' },
  { name: 'PayPal', logo: '/Payment%20Logos/paypal.png' },
  { name: 'Remitly', logo: '/Payment%20Logos/remitly.png' },
  // Wide banner logos — taller/wider slot (no transform) so they don't overlap neighbors
  {
    name: 'ADIB',
    logo: '/Payment%20Logos/adib.png',
    imageClass: 'h-9 sm:h-10 md:h-11 w-[112px] sm:w-[124px] md:w-[136px]',
  },
  {
    name: 'Al Rajhi Bank',
    logo: '/Payment%20Logos/al-raji.png',
    imageClass: 'h-9 sm:h-10 md:h-11 w-[112px] sm:w-[124px] md:w-[136px]',
  },
];
