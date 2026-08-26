import { ArrowUpRight, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";

export interface ProjectData {
  id: number;
  title: string;
  category: string;
  industry: string;
  software: string[];
  difficulty: string;
  description: string;
  metrics: string[];
  modelFile?: string;
  image?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const loadedProjects: ProjectData[] = [];
      let i = 1;
      
      // Sequentially load 1.json, 2.json until a 404 is returned
      while (true) {
        try {
          const res = await fetch(`${import.meta.env.BASE_URL}projects/${i}/json/${i}.json`);
          if (!res.ok) break; // Stop loading if file doesn't exist

          // Vite SPA fallback returns index.html for missing files, which causes JSON parse errors.
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("text/html")) {
             console.log(`Stopped fetching at ${i}.json because HTML fallback was returned.`);
             break;
          }
          
          const data = await res.json();
          loadedProjects.push({ ...data, id: i });
          i++;
        } catch (e) {
          console.error(`Error loading project ${i}.json:`, e);
          break;
        }
      }
      
      setProjects(loadedProjects);
      setLoading(false);
    };
    
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 md:py-32 relative z-10">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-[#DC2626] rounded-full" />
          <p className="text-foreground/60 mt-4 max-w-2xl">
            A selection of precision engineering and mechanical design projects.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DC2626]"></div>
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
            {projects.map((project) => (
              <Link
                href={`/case-study/${project.id}`}
                key={project.id}
                className="block group bg-card/90 backdrop-blur-md border border-border rounded-xl overflow-hidden hover:border-[#DC2626] hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 min-w-[280px] md:min-w-[340px] max-w-[340px] flex-shrink-0 snap-start hide-scrollbar btn-press"
              >
                {/* Placeholder or Rendered Image */}
                <div className="relative h-72 bg-gradient-to-br from-[#DC2626]/5 to-[#4A5A6A]/10 flex items-center justify-center overflow-hidden border-b border-border/50">
                  {project.image ? (
                    <img src={project.image.startsWith('/') ? `${import.meta.env.BASE_URL}${project.image.slice(1)}` : project.image} alt={project.title} className="w-full h-full object-contain p-4 drop-shadow-xl group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/40 to-transparent" />
                  )}
                  
                  {!project.image && (
                    <div className="text-center space-y-2 relative z-10">
                      <div className="w-16 h-16 mx-auto bg-[#DC2626]/20 rounded-lg flex items-center justify-center border border-[#DC2626]/30 group-hover:border-[#DC2626] transition-colors">
                        <svg
                           className="w-8 h-8 text-[#DC2626]"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             strokeWidth={1.5}
                             d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2.75 1.5m0 0l-2.75-1.5m2.75 1.5v2.5M4 7l2.75 1.5m0 0L9.5 7m-2.75 1.5v2.5"
                           />
                        </svg>
                      </div>
                      <p className="text-xs text-foreground/60 font-medium">
                        {project.modelFile ? `Model: ${project.modelFile}` : "CAD Model"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Category Badge & Like Button */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-[#DC2626]/10 text-[#DC2626] text-xs font-semibold rounded-full">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-foreground/50">
                        {project.difficulty}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const target = e.currentTarget;
                          target.classList.add('text-red-500', 'animate-heart-pop');
                          target.querySelector('svg')?.setAttribute('fill', 'currentColor');
                          setTimeout(() => {
                            target.classList.remove('animate-heart-pop');
                          }, 400);
                        }}
                        className="text-foreground/30 hover:text-red-500 transition-colors duration-200"
                        title="Save to Wishlist"
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-foreground/60 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Software Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.software?.map((soft) => (
                      <span
                        key={soft}
                        className="px-2 py-1 bg-muted border border-border rounded text-xs font-medium text-foreground/70"
                      >
                        {soft}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-3">
                      {project.metrics?.map((metric) => (
                        <span
                          key={metric}
                          className="text-xs font-semibold text-[#DC2626]"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-foreground/60 mb-6">
            Have a similar fixture or tolerance challenge?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#DC2626] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover-glow btn-press"
          >
            Let's Talk
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
