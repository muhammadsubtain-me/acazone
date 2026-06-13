import { Badge } from '@/components/ui/badge';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import PageHero from '@/components/PageHero';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHero title="About ZenEdify" subtitle="Your trusted academic partner, built on expertise and integrity." />

      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Badge className="mb-5">Our Story</Badge>
            <h2 className="font-display text-3xl font-bold mb-5 text-[var(--color-text-heading)]">Who We Are</h2>
            {[
              'ZenEdify was founded with a single mission: to provide students worldwide with access to world-class academic expertise. We believe every student deserves the support they need to reach their full potential.',
              "Our platform connects students with verified subject matter experts who provide personalized, high-quality academic assistance. Whether you're struggling with a complex engineering problem or need help polishing a dissertation, ZenEdify has you covered.",
              "With tutors from top universities across the globe and a commitment to academic excellence, we've helped thousands of students achieve the grades they deserve — on time, every time.",
            ].map((p, i) => (
              <p key={i} className="text-[var(--color-text-muted)] leading-[1.7] mb-4">{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '🎯', title: 'Our Mission', desc: 'Empower every student with expert academic support to unlock their true potential.' },
              { icon: '👁️', title: 'Our Vision', desc: 'Become the most trusted global platform for academic excellence and student success.' },
              { icon: '💎', title: 'Our Values', desc: 'Integrity, quality, confidentiality, and student-first thinking in everything we do.' },
              { icon: '🌍', title: 'Global Reach', desc: 'Serving students across 50+ countries with localized expertise and 24/7 support.' },
            ].map((item) => (
              <Card key={item.title} className="p-5">
                <div className="text-2xl mb-3">{item.icon}</div>
                <CardTitle className="mb-2">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-section-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-10 text-[var(--color-text-heading)]">Our Expert Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['⚙️ Mechanical', '⚡ Electrical', '🧪 Chemical', '💻 CS & IT'].map((dept) => (
              <Card key={dept} className="p-6 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)]">
                <div className="text-[40px] mb-3">{dept.split(' ')[0]}</div>
                <div className="font-semibold text-[var(--color-text-heading)]">{dept.split(' ').slice(1).join(' ')}</div>
                <div className="text-[13px] text-[var(--color-text-muted)] mt-1">Department</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
