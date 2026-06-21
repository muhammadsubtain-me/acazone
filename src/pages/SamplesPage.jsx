import useSEO from '@/hooks/useSEO';
import PageHero from '@/components/PageHero';
import { pdfSamples } from '@/lib/contentData';
import { ExternalLink, BookOpen, FileText, File } from 'lucide-react';

export default function SamplesPage() {
  useSEO(
    'Solved Academic Assignment Samples & Reports',
    'Download verified solutions for mechanical engineering statics, circuit network analysis, Python simulations, HVAC layouts, and lecture notes from our academic database.'
  );

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
        subtitle="Explore our verified portfolio of solved assignments, structured lecture notes, and professional engineering reports." 
      />
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          

          {/* Categorized PDF Rows */}
          <div className="space-y-14">
            {sections.map((sec) => {
              const list = pdfSamples[sec.key] || [];
              return (
                <div key={sec.key} className="space-y-4">
                  {/* Section Header */}
                  <div className="flex flex-col gap-1 border-b border-white/[0.06] pb-3 mb-6">
                    <div className="flex items-center gap-2">
                      {sec.icon}
                      <h2 className="text-lg font-bold text-[var(--color-text-heading)] tracking-wide">{sec.title}</h2>
                    </div>
                    <p className="text-xs sm:text-[13px] text-[var(--color-text-muted)] leading-relaxed">{sec.subtitle}</p>
                  </div>
                  
                  {/* Grid Layout */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {list.map((item) => (
                      <div
                        key={item.pdfUrl}
                        onClick={() => window.open(item.pdfUrl, '_blank')}
                        className="max-w-[200px] w-full mx-auto group cursor-pointer bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
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
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
