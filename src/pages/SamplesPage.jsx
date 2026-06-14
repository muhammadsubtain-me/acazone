import { Link } from 'react-router-dom';
import PageHero from '@/components/PageHero';
import { pdfSamples } from '@/lib/contentData';
import { ExternalLink, BookOpen, FileText, File } from 'lucide-react';

export default function SamplesPage() {
  const sections = [
    { 
      key: 'problems', 
      title: 'Problem Sets', 
      subtitle: 'Expertly solved homework assignments, problems, and practice sheets.', 
      icon: <BookOpen className="w-5 h-5 text-neutral-400" /> 
    },
    { 
      key: 'lectures', 
      title: 'Lectures', 
      subtitle: 'Structured lecture notes, slides, and educational guides.', 
      icon: <FileText className="w-5 h-5 text-neutral-400" /> 
    },
    { 
      key: 'reports', 
      title: 'Reports', 
      subtitle: 'Rigorous engineering reports, lab files, and case study documents.', 
      icon: <File className="w-5 h-5 text-neutral-400" /> 
    }
  ];

  return (
    <div className="min-h-screen pb-24 bg-[var(--color-bg)]">
      <PageHero 
        title="Work Samples" 
        subtitle="Browse examples of the high-quality academic work our experts deliver." 
      />
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Introductory Paragraph */}
          <div className="mb-14 max-w-4xl border-l-2 border-[var(--color-accent)] pl-4">
            <p className="text-[15px] sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              Get expert <Link to="/contact" className="text-white hover:underline font-medium">academic help</Link> with our homework help samples page. Find high-quality essays, physics assignment, circuit design, Mathematics assignment, research papers, and more written by professionals in your field. Improve your grades and excel in your studies with our reliable academic assistance.
            </p>
          </div>

          {/* Categorized PDF Rows */}
          <div className="space-y-12">
            {sections.map((sec) => {
              const list = pdfSamples[sec.key] || [];
              return (
                <div key={sec.key} className="space-y-2">
                  {/* Horizontal Scroll Wrapper */}
                  <div className="relative">
                    {/* Fade effect on right for desktop scrolling hint */}
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--color-bg)] to-transparent pointer-events-none z-10 hidden sm:block" />
                    
                    <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth no-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0 md:flex-wrap md:justify-center md:overflow-visible">
                      {list.map((item) => (
                        <div
                          key={item.pdfUrl}
                          onClick={() => window.open(item.pdfUrl, '_blank')}
                          className="flex-none w-[160px] sm:w-[200px] group cursor-pointer bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
                        >
                          {/* Thumbnail Container in adjusted ratio to fit width and show more height */}
                          <div className="relative aspect-[1/1.25] bg-white overflow-hidden flex items-start justify-center">
                            <img
                              src={item.thumbnailUrl}
                              alt={item.title}
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <ExternalLink className="w-4.5 h-4.5" />
                              </div>
                              <span className="text-[10px] font-semibold text-white tracking-wider uppercase mt-1">
                                View PDF
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
