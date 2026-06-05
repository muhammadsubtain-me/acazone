import { useState } from 'react';

const testimonials = [
  {
    name: 'Maha Al Sulaiti',
    role: 'Student',
    avatar: '👩‍🎓',
    text: 'When I was writing my dissertation, I used Zenedify for the first time. I had run out of time and only needed to finish it. They helped my friend with her homework and essays, so she forwarded the information. Since then, we have collaborated quite a bit, and I cannot imagine not using their services.',
    rating: 5,
  },
  {
    name: 'Mahmoud Elgad',
    role: 'Student',
    avatar: '👨‍🎓',
    text: 'My friend recommended this website, and I am glad I tried it. I had three days to complete an essay assignment. I am grateful for the wonderful experience — the quality exceeded what I expected for such a tight deadline.',
    rating: 5,
  },
  {
    name: 'Alicia Patrick',
    role: 'Student',
    avatar: '👩‍💻',
    text: 'It was the end of the semester, and I needed help with my project. It is a coincidence that I stumbled upon this website. The quality of the project they delivered was beyond my expectations! Highly recommend them.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900">
            What Clients Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Active card */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 sm:p-10 border border-indigo-100 relative mb-8">
            <div className="text-5xl text-indigo-200 font-display leading-none mb-4">"</div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {testimonials[active].text}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">
                {testimonials[active].avatar}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{testimonials[active].name}</div>
                <div className="text-sm text-gray-500">{testimonials[active].role}</div>
              </div>
              <div className="ml-auto flex gap-0.5">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === active
                    ? 'w-8 h-3 bg-indigo-600'
                    : 'w-3 h-3 bg-indigo-200 hover:bg-indigo-400'
                }`}
              />
            ))}
          </div>

          {/* Thumbnail avatars */}
          <div className="flex justify-center gap-4 mt-6">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
                  i === active
                    ? 'ring-2 ring-indigo-500 ring-offset-2 bg-indigo-100 scale-110'
                    : 'bg-gray-100 opacity-60 hover:opacity-100'
                }`}
              >
                {t.avatar}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
