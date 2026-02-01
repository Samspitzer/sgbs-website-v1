import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { services, products } from '../data/services';

export function ServicesPage() {
  return (
    <div className="bg-dark-950">
      <PageHero
        title="Our Services"
        subtitle="Complete door and hardware solutions from estimating to installation"
        backgroundImage="/images/projects/harrison-grand.jpg"
      />

      {/* ============ SERVICES GRID ============ */}
      <section className="section-padding bg-dark-900 relative overflow-hidden noise-overlay">
        <div className="container-custom relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="line-accent mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream-100">
              Full-Service Support
            </h2>
            <p className="mt-4 text-cream-100/70 text-lg">
              We handle every phase of your door and hardware scope, from initial bid through final punch list.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group p-8 bg-dark-800 border border-dark-700 hover:border-accent-500/50 transition-all duration-300"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-accent-500/10 text-accent-400 mb-6 group-hover:bg-accent-500 group-hover:text-white transition-all duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-cream-100 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-cream-100/60 leading-relaxed text-lg">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PRODUCTS SECTION ============ */}
      <section className="section-padding bg-dark-950">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="line-accent mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream-100">
              Product Categories
            </h2>
            <p className="mt-4 text-cream-100/70 text-lg">
              We supply a complete range of doors, frames, hardware, and millwork for residential and commercial projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative p-8 bg-dark-900 border border-dark-700 hover:border-accent-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-accent-500/10 text-accent-400 mb-6">
                  <div className="w-3 h-3 bg-accent-500" />
                </div>
                <h3 className="text-xl font-semibold text-cream-100 mb-3">
                  {product.title}
                </h3>
                <p className="text-cream-100/60 leading-relaxed">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS SECTION ============ */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="line-accent mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream-100">
                Our Process
              </h2>
              <p className="mt-6 text-cream-100/70 text-lg leading-relaxed">
                We've refined our process over 25+ years to ensure smooth coordination 
                and on-time delivery for every project.
              </p>

              <div className="mt-10 space-y-8">
                {[
                  {
                    step: '01',
                    title: 'Estimating & Bidding',
                    description: 'We review your plans and prepare accurate, competitive bids with detailed breakdowns.',
                  },
                  {
                    step: '02',
                    title: 'Field Measurement',
                    description: 'Our team measures on-site to confirm all dimensions and technical details.',
                  },
                  {
                    step: '03',
                    title: 'Shop Drawings & Submittals',
                    description: 'Detailed drawings prepared and coordinated with architects and GCs for approval.',
                  },
                  {
                    step: '04',
                    title: 'Manufacturing & Procurement',
                    description: 'We coordinate with manufacturers to ensure materials arrive on your schedule.',
                  },
                  {
                    step: '05',
                    title: 'Delivery & Installation',
                    description: 'Supervised deliveries and professional installation in the tristate area.',
                  },
                  {
                    step: '06',
                    title: 'Punch List & Closeout',
                    description: 'We stay on the job until every door and piece of hardware is perfect.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-accent-500 text-accent-400 font-display font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-cream-100">{item.title}</h3>
                      <p className="mt-1 text-cream-100/60">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/projects/jersey-walk.jpg"
                alt="Project site"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section-padding bg-dark-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/20 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream-100">
            Need a Quote for Your Project?
          </h2>
          <p className="mt-4 text-cream-100/70 text-lg max-w-xl mx-auto">
            Send us your plans and we'll prepare a detailed estimate. Our team responds quickly.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Request a Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:845-923-2052" className="btn-outline">
              <Phone className="w-5 h-5" /> Call 845-923-2052
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
