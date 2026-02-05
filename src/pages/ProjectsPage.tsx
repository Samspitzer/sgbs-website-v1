import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { projects, categories } from '../data/projects';

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-dark-950">
      <PageHero
        title="Our Projects"
        subtitle="A sample of recent multifamily and commercial work across the Northeast and beyond"
        backgroundImage="/images/projects/allure-258.jpeg"
      />

      {/* ============ PROJECTS GALLERY ============ */}
      <section className="section-padding bg-dark-900 relative overflow-hidden noise-overlay">
        <div className="container-custom relative">
          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-accent-500 text-white'
                    : 'bg-dark-800 text-cream-100/70 border border-dark-600 hover:border-accent-500/50 hover:text-cream-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group relative overflow-hidden card-hover"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover card-image transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 card-overlay-gallery opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Accent overlay on hover */}
                <div className="absolute inset-0 bg-accent-500/0 group-hover:bg-accent-500/10 transition-colors duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="text-accent-400 text-sm font-semibold tracking-wide uppercase mb-2">
                    {project.units}
                  </p>
                  <h3 className="text-2xl font-display font-semibold text-cream-100 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-cream-100/70">
                    {project.location}
                  </p>
                  {project.description && (
                    <p className="mt-3 text-cream-100/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-cream-100/60 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ============ PROJECT STATS ============ */}
      <section className="py-16 bg-dark-950">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '50K+', label: 'Doors Supplied' },
              { value: '1M+', label: 'Sq Ft Covered' },
              { value: '48', label: 'States Delivered' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center p-8 border ${
                  index === 0 ? 'border-accent-500/50' : 'border-dark-700'
                } bg-dark-900`}
              >
                <div className="text-3xl lg:text-4xl font-display font-bold text-accent-400">
                  {stat.value}
                </div>
                <div className="mt-2 text-cream-100/60 text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section-padding bg-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/20 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream-100">
            Have a Project in Mind?
          </h2>
          <p className="mt-4 text-cream-100/70 text-lg max-w-xl mx-auto">
            Let's discuss how we can help with your door and hardware needs.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Get a Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/services" className="btn-outline">
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}