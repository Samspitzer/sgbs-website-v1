import { useState, useMemo } from 'react';
import { projects, categories } from '../data/projects';
import { stats } from '../data/services';
import { useSmoothSnap } from '../hooks/useSmoothSnap';
import { Footer } from '../components/Footer';

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  useSmoothSnap(1200);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-dark-950">

      {/* ============ HERO SECTION ============ */}
      <section className="relative h-screen min-h-[700px] overflow-hidden snap-section">
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden opacity-35">
            <img
              src="/images/projects/allure-258.jpeg"
              alt=""
              className="absolute w-full h-full object-cover"
              style={{ filter: 'blur(18px)', transform: 'scale(1.2)' }}
            />
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/projects/allure-258.jpeg"
              alt=""
              className="absolute w-full h-full object-cover hero-zoom"
              style={{
                objectPosition: '50% 50%',
                transformOrigin: '50% 50%',
                '--zoom-from': 1.1,
                '--zoom-to': 1.03,
                '--focus-x': '50%',
                '--y-start': '50%',
                '--y-end': '50%',
              } as React.CSSProperties}
            />
          </div>
          <div className="absolute inset-0" style={{ background: 'rgba(0, 0, 0, 0.3)' }} />
          <div className="absolute inset-0 hero-text-backdrop" />
          <div className="absolute inset-x-0 top-0 h-40 hero-top-gradient" />
        </div>

        <div className="relative h-full w-full px-8 md:px-14 lg:px-20 xl:px-24">
          <div className="flex flex-col justify-center h-full pt-20">
            <div className="max-w-3xl">
              <p className="text-accent-400 font-bold tracking-[0.2em] uppercase text-base mb-4 animate-fade-in hero-text-strong">
                Our Portfolio
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] animate-fade-in-up hero-text-strong">
                Projects Across<br />
                <span className="text-accent-400">The Nation</span>
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-white/90 font-medium leading-relaxed max-w-lg animate-fade-in-up stagger-2 hero-text">
                A sample of recent multifamily and commercial work across the Northeast and beyond.
              </p>

              {/* Inline Stats */}
              <div className="mt-10 flex flex-wrap gap-8 animate-fade-in-up stagger-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="hero-text-strong">
                    <div className="text-3xl font-display font-bold text-accent-400">{stat.value}</div>
                    <div className="text-white/70 text-sm uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROJECTS GALLERY ============ */}
      <section className="h-screen flex flex-col justify-center snap-section bg-dark-900 relative overflow-hidden noise-overlay">
        <div className="container-custom relative w-full">
          {/* Header + Filters */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div className="animate-fade-in-up">
              <div className="line-accent mb-4" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream-100">
                Project Gallery
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0 animate-fade-in-up stagger-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-accent-500 text-white'
                      : 'bg-dark-800 text-cream-100/70 border border-dark-600 hover:border-accent-500/50 hover:text-cream-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in-up stagger-2">
            {filteredProjects.slice(0, 6).map((project) => (
              <article
                key={project.id}
                className="group relative overflow-hidden card-hover"
                style={{ borderRadius: '4px' }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover card-image transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 card-overlay-gallery opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-accent-500/0 group-hover:bg-accent-500/10 transition-colors duration-300" />

                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <p className="text-accent-400 text-xs font-semibold tracking-wide uppercase mb-1">
                    {project.units}
                  </p>
                  <h3 className="text-xl font-display font-semibold text-cream-100 mb-0.5">
                    {project.name}
                  </h3>
                  <p className="text-cream-100/70 text-sm">
                    {project.location}
                  </p>
                  {project.description && (
                    <p className="mt-2 text-cream-100/60 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-cream-100/60 text-lg">No projects found in this category.</p>
            </div>
          )}

          {filteredProjects.length > 6 && (
            <div className="text-center mt-6">
              <p className="text-cream-100/50 text-sm">
                Showing 6 of {filteredProjects.length} projects
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ============ CTA + FOOTER ============ */}
      <Footer isSnapSection />
    </div>
  );
}