import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { stats } from '../data/services';
import { useSmoothSnap } from '../hooks/useSmoothSnap';
import { Footer } from '../components/Footer';

export function AboutPage() {
  useSmoothSnap(1200);

  return (
    <div className="bg-dark-950">

      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-screen lg:h-screen overflow-hidden snap-section">
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden opacity-35">
            <img src="/images/projects/halo-newark.jpg" alt="" className="absolute w-full h-full object-cover" style={{ filter: 'blur(18px)', transform: 'scale(1.2)' }} />
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <img src="/images/projects/halo-newark.jpg" alt="" className="absolute w-full h-full object-cover hero-zoom" style={{
              objectPosition: '50% 0%', transformOrigin: '50% 0%',
              '--zoom-from': 1.03, '--zoom-to': 1.21, '--focus-x': '50%', '--y-start': '0%', '--y-end': '96%',
            } as React.CSSProperties} />
          </div>
          <div className="absolute inset-0" style={{ background: 'rgba(0, 0, 0, 0.3)' }} />
          <div className="absolute inset-0 hero-text-backdrop" />
          <div className="absolute inset-x-0 top-0 h-40 hero-top-gradient" />
        </div>

        <div className="relative h-full w-full px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-24">
          <div className="flex flex-col justify-center min-h-screen lg:h-full pt-24 pb-12 lg:pt-20 lg:pb-0">
            <div className="max-w-3xl">
              <p className="text-accent-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 animate-fade-in hero-text-strong">
                About S&G Builders Supply
              </p>
              <h1 className="font-display text-[2.25rem] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-[1.1] animate-fade-in-up hero-text-strong">
                Your Single Source for<br />
                <span className="text-accent-400">Doors &amp; Hardware</span>
              </h1>
              <p className="mt-6 text-base lg:text-lg xl:text-xl text-white/90 font-medium leading-relaxed max-w-lg animate-fade-in-up stagger-2 hero-text">
                Specializing in multifamily and commercial construction — complete door, frame, hardware, and millwork packages delivered nationwide.
              </p>
              <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up stagger-3">
                <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary">
                  Get a Quote <ArrowRight className="w-5 h-5" />
                </a>
                <Link to="/services" className="btn-outline">Our Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHO WE ARE + STATS ============ */}
      <section className="min-h-screen lg:h-screen flex items-center snap-section relative overflow-hidden py-20 lg:py-0">
        <div className="absolute inset-0 overflow-hidden">
          <img src="/images/backgrounds/services4.jpg" alt="" className="w-full h-full object-cover" style={{ filter: 'blur(3px)', transform: 'scale(1.05)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.75) 100%)' }} />
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-10 xl:gap-14 2xl:gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="line-accent mb-6" />
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-cream-100" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                Your Complete Door &amp; Hardware Solution
              </h2>
              <div className="mt-6 lg:mt-6 xl:mt-8 space-y-5 lg:space-y-4 xl:space-y-6 text-cream-100/80 text-base lg:text-[15px] xl:text-lg leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                <p>
                  S&G Builders Supply Inc. is your single source for doors, frames, hardware,
                  and molding. We specialize in multifamily residential and commercial construction,
                  providing complete door and hardware packages for projects ranging from small
                  renovations to large-scale developments with hundreds of units.
                </p>
                <p>
                  With nationwide delivery capabilities and professional installation services
                  throughout the tristate area, we streamline your procurement process and
                  ensure your project stays on schedule.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:gap-4 xl:gap-6 animate-fade-in-up stagger-2">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`p-5 lg:p-5 xl:p-6 2xl:p-8 border bg-dark-800/50 backdrop-blur-sm transition-all duration-300 hover:border-accent-500/50 ${
                    index === 0 ? 'border-accent-500/50' : 'border-dark-600'
                  }`}
                >
                  <div className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-display font-bold text-accent-400">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-cream-100/60 text-xs lg:text-xs xl:text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA + FOOTER ============ */}
      <Footer isSnapSection />
    </div>
  );
}