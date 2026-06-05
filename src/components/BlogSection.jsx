import { Link } from 'react-router-dom';

const posts = [
  {
    category: 'MATLAB Assignment',
    title: 'How to Calculate the Condition Number in MATLAB Assignment?',
    excerpt: 'In the field of numerical analysis, the condition number plays a vital role in understanding the sensitivity of a function to changes in input.',
    date: 'July 19, 2023',
    comments: 4,
    emoji: '🔢',
  },
  {
    category: 'Coding Homework',
    title: 'What is Coding and Its Unleashing Power?',
    excerpt: 'Programming, often referred to as coding, is the process of creating instructions for computers to execute. Discover its true potential.',
    date: 'July 17, 2023',
    comments: 3,
    emoji: '💻',
  },
  {
    category: 'Homework Services',
    title: 'How to Write a Literature Review?',
    excerpt: 'When writing a research paper, a literature review is essential. Learn the step-by-step process to write one that impresses.',
    date: 'July 4, 2023',
    comments: 4,
    emoji: '📖',
  },
  {
    category: 'Coding Homework',
    title: 'How to Get Done with the Coding Assignment?',
    excerpt: 'Assuming you see a coding assignment for the first time, here is how to approach it methodically and deliver quality work on time.',
    date: 'July 3, 2023',
    comments: 2,
    emoji: '🚀',
  },
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-4">
              Latest Articles
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900">Our Blog</h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:gap-3 transition-all"
          >
            View All Blogs
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50 overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 h-36 flex items-center justify-center text-6xl border-b border-gray-100">
                {post.emoji}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 rounded-full px-2.5 py-1">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 group-hover:text-indigo-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
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
