import { useState } from 'react';
import { services, products } from '../data/services';
import { ImageWithFallback, stripExtension } from '../components/ImageWithFallback';

export function ServicesPage() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <div className="bg-dark-950">

      {/* ============ HERO SECTION ============ */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-end">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/backgrounds/services.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'blur(1px)', transform: 'scale(1.02)' }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.85) 100%)' }}
          />
        </div>

        <div className="relative z-10 container-custom pb-16">
          <div className="max-w-3xl">
            <p className="text-accent-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 hero-text-strong">
              What We Do
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream-100 leading-[1.1]" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)' }}>
              Full-Service Door &<br />Hardware Solutions
            </h1>
            <p className="mt-4 text-white/80 text-lg max-w-xl" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
              From initial estimating through final punch list, we handle every phase of your door, hardware, and millwork scope.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SERVICES SECTION ============ */}
      <section className="relative py-24 overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-dark-900" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 60px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="container-custom relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream-100">
              Our Services
            </h2>
            <p className="mt-4 text-cream-100/60 text-lg">
              We handle every phase of your door and hardware scope, from initial bid through final punch list.
            </p>
          </div>

          {/* Services - alternating layout */}
          <div className="space-y-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isHovered = hoveredService === service.id;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  className="group relative overflow-hidden transition-all duration-500"
                  style={{ 
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} min-h-[220px]`}>
                    {/* Image side */}
                    <div className="w-[40%] relative overflow-hidden">
                      <ImageWithFallback 
                        basePath={stripExtension(service.image)}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                        style={{ 
                          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                          objectPosition: 'center 30%',
                        }}
                      />
                      <div 
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{ 
                          background: isEven 
                            ? 'linear-gradient(to right, transparent 60%, rgba(20,20,20,1) 100%)' 
                            : 'linear-gradient(to left, transparent 60%, rgba(20,20,20,1) 100%)',
                          opacity: 1,
                        }}
                      />
                    </div>

                    {/* Content side */}
                    <div className="w-[60%] p-10 flex flex-col justify-center relative" style={{ background: 'rgba(20,20,20,0.95)' }}>
                      <div className="flex items-center gap-4 mb-4">
                        <div 
                          className="flex-shrink-0 flex items-center justify-center transition-all duration-500"
                          style={{ 
                            width: '48px', 
                            height: '48px',
                            background: isHovered ? 'rgba(139, 26, 26, 1)' : 'rgba(139, 26, 26, 0.1)',
                          }}
                        >
                          <Icon className={`w-5 h-5 transition-colors duration-500 ${isHovered ? 'text-white' : 'text-accent-400'}`} />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-cream-100">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-cream-100/60 text-lg leading-relaxed max-w-lg">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PRODUCTS SECTION ============ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/backgrounds/cta.jpeg"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'blur(3px)', transform: 'scale(1.05)' }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.8) 100%)' }}
          />
        </div>

        <div className="container-custom relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream-100" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Product Categories
            </h2>
            <p className="mt-4 text-cream-100/60 text-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
              We supply a complete range of doors, frames, hardware, and millwork for residential and commercial projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ 
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(10,10,10,0.7)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="p-8">
                  <div 
                    className="w-10 h-10 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-accent-500"
                    style={{ background: 'rgba(139, 26, 26, 0.15)' }}
                  >
                    <div className="w-2.5 h-2.5 bg-accent-400 group-hover:bg-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-cream-100 mb-3">
                    {product.title}
                  </h3>
                  <p className="text-cream-100/50 leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS SECTION ============ */}
      <section className="relative py-24 bg-dark-900 overflow-hidden">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream-100">
              Our Process
            </h2>
            <p className="mt-4 text-cream-100/60 text-lg">
              A streamlined approach refined over years of experience to keep your project on schedule and on budget.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Steps */}
            <div className="space-y-0">
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
              ].map((item, index) => (
                <div key={item.step} className="group flex gap-6 relative">
                  {/* Vertical line connector */}
                  {index < 5 && (
                    <div className="absolute left-[23px] top-[48px] w-px h-[calc(100%-48px)] bg-dark-700" />
                  )}
                  
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-accent-500/50 text-accent-400 font-display font-bold text-sm relative z-10 bg-dark-900 group-hover:bg-accent-500 group-hover:text-white group-hover:border-accent-500 transition-all duration-300">
                    {item.step}
                  </div>
                  <div className="pb-10">
                    <h3 className="text-lg font-semibold text-cream-100 group-hover:text-accent-400 transition-colors duration-300">{item.title}</h3>
                    <p className="mt-2 text-cream-100/50 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="sticky top-32">
              <div className="overflow-hidden" style={{ borderRadius: '8px' }}>
                <img
                  src="/images/projects/jersey-walk.jpg"
                  alt="Project site"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 40%)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ServicesPage;