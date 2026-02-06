import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { services } from '../data/services';
import { ImageWithFallback, stripExtension } from '../components/ImageWithFallback';
import { useSmoothSnap } from '../hooks/useSmoothSnap';
import { Footer } from '../components/Footer';

export function ServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useSmoothSnap(1200);

  const goToService = useCallback((index: number) => {
    setActiveService(((index % services.length) + services.length) % services.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = services[activeService];
  const Icon = current.icon;

  return (
    <div className="bg-dark-950">

      {/* ============ HERO SECTION ============ */}
      <section className="relative h-screen min-h-[700px] overflow-hidden snap-section flex items-end">
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden opacity-35">
            <img
              src="/images/backgrounds/services.jpg"
              alt=""
              className="absolute w-full h-full object-cover"
              style={{ filter: 'blur(18px)', transform: 'scale(1.2)' }}
            />
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/backgrounds/services.jpg"
              alt=""
              className="absolute w-full h-full object-cover hero-zoom-slow"
              style={{
                objectPosition: '50% 50%',
                transformOrigin: '50% 50%',
                '--zoom-from': 1.1,
                '--zoom-to': 1.03,
                '--focus-x': '50%',
                '--y-start': '30%',
                '--y-end': '50%',
              } as React.CSSProperties}
            />
          </div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.85) 100%)' }} />
          <div className="absolute inset-0 hero-text-backdrop" />
          <div className="absolute inset-x-0 top-0 h-40 hero-top-gradient" />
        </div>

        <div className="relative z-10 container-custom pb-20 lg:pb-28">
          <div className="max-w-3xl">
            <p className="text-accent-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 animate-fade-in hero-text-strong">
              What We Do
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] animate-fade-in-up hero-text-strong">
              Full-Service Door &amp;<br />
              <span className="text-accent-400">Hardware Solutions</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-white/90 font-medium leading-relaxed max-w-xl animate-fade-in-up stagger-2 hero-text">
              From initial estimating through final punch list, we handle every phase of your door, hardware, and millwork scope.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary">
                Get a Quote <ArrowRight className="w-5 h-5" />
              </a>
              <Link to="/projects" className="btn-outline">
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES SHOWCASE ============ */}
      <section
        className="h-screen flex items-center snap-section relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback
            basePath={stripExtension(current.image)}
            alt=""
            className="w-full h-full object-cover transition-opacity duration-700"
            style={{ filter: 'blur(2px)', transform: 'scale(1.05)', objectPosition: 'center 30%' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.4) 100%)' }}
          />
        </div>

        <div className="container-custom relative w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 flex items-center justify-center bg-accent-500 text-white transition-all duration-500">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-accent-400 text-xs font-bold tracking-[0.2em] uppercase">
                    Service {activeService + 1} of {services.length}
                  </p>
                </div>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream-100 mb-6" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                {current.title}
              </h2>
              <p className="text-cream-100/80 text-lg leading-relaxed max-w-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                {current.description}
              </p>

              {/* Navigation */}
              <div className="mt-10 flex items-center gap-4">
                <button
                  onClick={() => goToService(activeService - 1)}
                  className="w-12 h-12 flex items-center justify-center border border-dark-600 text-cream-100/70 hover:border-accent-500 hover:text-accent-400 transition-all duration-300"
                  aria-label="Previous service"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => goToService(activeService + 1)}
                  className="w-12 h-12 flex items-center justify-center border border-dark-600 text-cream-100/70 hover:border-accent-500 hover:text-accent-400 transition-all duration-300"
                  aria-label="Next service"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="flex gap-2 ml-4">
                  {services.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToService(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeService ? 'w-8 bg-accent-500' : 'w-3 bg-dark-600 hover:bg-dark-500'
                      }`}
                      aria-label={`Go to service ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Service Image */}
            <div className="hidden lg:block">
              <div className="relative overflow-hidden" style={{ borderRadius: '8px' }}>
                <ImageWithFallback
                  basePath={stripExtension(current.image)}
                  alt={current.title}
                  className="w-full aspect-[4/3] object-cover"
                  style={{ objectPosition: 'center 30%' }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-accent-400 hero-text-strong">{current.title}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA + FOOTER ============ */}
      <Footer isSnapSection />
    </div>
  );
}

export default ServicesPage;