import { Link } from 'react-router-dom';

const posts = [
  { category: 'MATLAB Assignment', title: 'How to Calculate the Condition Number in MATLAB Assignment?', excerpt: 'In the field of numerical analysis, the condition number plays a vital role in understanding the sensitivity of a function to changes in input.', date: 'July 19, 2023', comments: 4, emoji: '🔢' },
  { category: 'Coding Homework', title: 'What is Coding and Its Unleashing Power?', excerpt: 'Programming, often referred to as coding, is the process of creating instructions for computers to execute. Discover its true potential.', date: 'July 17, 2023', comments: 3, emoji: '💻' },
  { category: 'Homework Services', title: 'How to Write a Literature Review?', excerpt: 'When writing a research paper, a literature review is essential. Learn the step-by-step process to write one that impresses.', date: 'July 4, 2023', comments: 4, emoji: '📖' },
  { category: 'Coding Homework', title: 'How to Get Done with the Coding Assignment?', excerpt: 'Assuming you see a coding assignment for the first time, here is how to approach it methodically and deliver quality work on time.', date: 'July 3, 2023', comments: 2, emoji: '🚀' },
];

export default function BlogSection() {
  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--color-section-alt)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: 'var(--color-text-muted)',
              background: 'var(--color-accent-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 16,
            }}>Latest Articles</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-text-heading)' }}>Our Blog</h2>
          </div>
          <Link to="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: 'var(--color-text-muted)', fontWeight: 600, fontSize: 14,
            textDecoration: 'none', transition: 'all 0.2s',
          }}>
            View All Blogs
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <article key={post.title} style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 16, overflow: 'hidden',
              transition: 'all 0.3s', cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{
                height: 144, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 56,
                backgroundColor: 'var(--color-surface-2)',
                borderBottom: '1px solid var(--color-border)',
              }}>
                {post.emoji}
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ marginBottom: 12 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    color: 'var(--color-text-muted)',
                    backgroundColor: 'var(--color-surface-3)',
                    borderRadius: 100, padding: '4px 10px',
                  }}>{post.category}</span>
                </div>
                <h3 style={{ fontWeight: 600, color: 'var(--color-text-heading)', fontSize: 13, lineHeight: 1.5, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.title}
                </h3>
                <p style={{ color: 'var(--color-text-faint)', fontSize: 12, lineHeight: 1.6, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--color-text-faint)' }}>
                  <span>{post.date}</span>
                  <span>{post.comments} comments</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
