import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Zap, Target, Truck, Award } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { stats } from '../data/services';

const values = [
  {
    icon: Shield,
    title: 'Trust',
    description: 'We\'ve built lasting relationships with builders and developers across the nation through reliable service, honest pricing, and consistent quality.',
  },
  {
    icon: Users,
    title: 'Experience',
    description: 'Over 25 years in the industry means we\'ve seen it all. Our team knows how to handle complex projects, tight timelines, and challenging specifications.',
  },
  {
    icon: Zap,
    title: 'Efficiency',
    description: 'From estimating to final punch, we streamline the process so your project stays on schedule and on budget. No surprises, no delays.',
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'Accurate field measurements, detailed shop drawings, and coordinated deliveries ensure everything fits right the first time.',
  },
  {
    icon: Truck,
    title: 'Nationwide Reach',
    description: 'We deliver to all 48 continental states. Our logistics team coordinates shipping to match your project schedule.',
  },
  {
    icon: Award,
    title: 'Quality Products',
    description: 'We partner with leading manufacturers to provide doors, frames, and hardware that meet the toughest specifications.',
  },
];

export function AboutPage() {
  return (
    <div className="bg-dark-950">
      <PageHero
        title="About S&G Builders Supply"
        subtitle="Doors, Frames, Hardware & Molding — Delivered Nationwide"
        backgroundImage="/images/projects/halo-newark.jpg"
      />

      {/* ============ WHO WE ARE ============ */}
      <section className="section-padding bg-dark-900 relative overflow-hidden noise-overlay">
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="line-accent mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream-100">
                Your Complete Door & Hardware Solution
              </h2>
              <div className="mt-8 space-y-6 text-cream-100/70 text-lg leading-relaxed">
                <p>
                  S&G Builders Supply Inc. is your single source for doors, frames, hardware, 
                  and molding. We specialize in multifamily residential and commercial construction, 
                  providing complete door and hardware packages for projects ranging from small 
                  renovations to large-scale developments with hundreds of units.
                </p>
                <p>
                  With nationwide delivery capabilities and professional installation services 
                  throughout the tristate area, we streamline your procurement process and 
                  ensure your project stays on schedule. Our experienced team handles everything 
                  from initial estimating through final punch list.
                </p>
                <p>
                  Whether you're building 30 units or 300, we have the resources, relationships, 
                  and expertise to deliver exactly what you need, when you need it.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`p-8 border bg-dark-800/50 ${
                    index === 0 ? 'border-accent-500/50' : 'border-dark-600'
                  }`}
                >
                  <div className="text-4xl lg:text-5xl font-display font-bold text-accent-400">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-cream-100/60 text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ OUR VALUES ============ */}
      <section className="section-padding bg-dark-950">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="line-accent mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream-100">
              Why Work With Us
            </h2>
            <p className="mt-4 text-cream-100/70 text-lg">
              We've built our reputation on these core principles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group p-8 bg-dark-900 border border-dark-700 hover:border-accent-500/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-accent-500/10 text-accent-400 mb-6 group-hover:bg-accent-500 group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-cream-100 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-cream-100/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PRODUCTS OVERVIEW ============ */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <img
                src="/images/projects/70-fisk-street.jpg"
                alt="Project"
                className="w-full aspect-[3/4] object-cover"
              />
              <img
                src="/images/projects/allure-258.jpeg"
                alt="Project"
                className="w-full aspect-[3/4] object-cover mt-8"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="line-accent mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream-100">
                Complete Product Selection
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  'Interior Wood & MDF Doors',
                  'Exterior & Entry Door Systems',
                  'Hollow Metal Doors & Frames',
                  'Fire-Rated Assemblies',
                  'Commercial Door Hardware',
                  'Molding & Millwork',
                ].map((product) => (
                  <div key={product} className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-accent-500" />
                    <span className="text-cream-100/80 text-lg">{product}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 mt-10 text-accent-400 font-semibold hover:text-accent-300 transition-colors"
              >
                View Our Services <ArrowRight className="w-5 h-5" />
              </Link>
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
            Let's Talk About Your Project
          </h2>
          <p className="mt-4 text-cream-100/70 text-lg max-w-xl mx-auto">
            Contact us for a quote or to discuss your upcoming project requirements.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/projects" className="btn-outline">
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
