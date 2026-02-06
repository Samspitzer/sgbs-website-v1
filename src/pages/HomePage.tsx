import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { services } from '../data/services';
import { useSmoothSnap } from '../hooks/useSmoothSnap';
import { ImageWithFallback, stripExtension } from '../components/ImageWithFallback';
import { Footer } from '../components/Footer';

type SlideSettings = {
  focusX: number;
  focusYStart: number;
  focusYEnd: number;
  zoomFrom: number;
  zoomTo: number;
  overlayOpacity: number;
};

type Project = {
  id: number;
  name: string;
  location: string;
  units: string;
  image: string;
  settings: SlideSettings;
};

const projects: Project[] = [
  {
    id: 1,
    name: '70 Fisk Street',
    location: 'Jersey City, NJ',
    units: '44 Units',
    image: '/images/projects/70-fisk-street.jpg',
    settings: { focusX: 0, focusYStart: 0, focusYEnd: 100, zoomFrom: 1.2, zoomTo: 1.03, overlayOpacity: 0.3 },
  },
  {
    id: 2,
    name: 'Halo Newark Phase 1',
    location: 'Newark, NJ',
    units: '303 Units',
    image: '/images/projects/halo-newark.jpg',
    settings: { focusX: 50, focusYStart: 0, focusYEnd: 96, zoomFrom: 1.03, zoomTo: 1.21, overlayOpacity: 0.3 },
  },
  {
    id: 3,
    name: 'Harrison Grand',
    location: 'Harrison, NY',
    units: '31 Units',
    image: '/images/projects/harrison-grand.jpg',
    settings: { focusX: 50, focusYStart: 50, focusYEnd: 50, zoomFrom: 1.1, zoomTo: 1.03, overlayOpacity: 0.3 },
  },
  {
    id: 4,
    name: 'Allure 258',
    location: 'East Orange, NJ',
    units: '203 Units',
    image: '/images/projects/allure-258.jpeg',
    settings: { focusX: 50, focusYStart: 50, focusYEnd: 50, zoomFrom: 1.1, zoomTo: 1.03, overlayOpacity: 0.3 },
  },
  {
    id: 5,
    name: 'Rainbow Village',
    location: 'Duluth, GA',
    units: '36 Units',
    image: '/images/projects/rainbow-village.jpg',
    settings: { focusX: 50, focusYStart: 50, focusYEnd: 50, zoomFrom: 1.1, zoomTo: 1.03, overlayOpacity: 0.25 },
  },
  {
    id: 6,
    name: '15 Parkview',
    location: 'Bronxville, NY',
    units: '60 Units',
    image: '/images/projects/15-parkview.jpg',
    settings: { focusX: 50, focusYStart: 0, focusYEnd: 88, zoomFrom: 1.23, zoomTo: 1.03, overlayOpacity: 0.3 },
  },
  {
    id: 7,
    name: 'Madison 2020',
    location: 'Reading, PA',
    units: '85 Units',
    image: '/images/projects/madison-2020.jpg',
    settings: { focusX: 50, focusYStart: 100, focusYEnd: 0, zoomFrom: 1.02, zoomTo: 1.2, overlayOpacity: 0.05 },
  },
  {
    id: 8,
    name: 'Jersey Walk',
    location: 'Jersey City, NJ',
    units: '274 Units',
    image: '/images/projects/jersey-walk.jpg',
    settings: { focusX: 0, focusYStart: 100, focusYEnd: 38, zoomFrom: 1.29, zoomTo: 1.03, overlayOpacity: 0.1 },
  },
];

/* ============ SERVICE CAROUSEL COMPONENT ============ */
function ServiceCarousel({ services: items }: { services: typeof services }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const total = items.length;

  const goTo = (index: number) => {
    setActiveIndex(((index % total) + total) % total);
  };

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (!isMounted) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total, isMounted]);

  const getOffset = (i: number) => {
    let diff = i - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div className="relative flex-1 min-h-0 flex flex-col">
      <div className="flex-1 flex items-center justify-center relative">
        {items.map((service, i) => {
          const Icon = service.icon;
          const offset = getOffset(i);
          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 2;
          if (!isVisible) return null;

          const scale = isCenter ? 1 : Math.abs(offset) === 1 ? 0.90 : 0.80;
          const xShift = offset * 350;
          const zIndex = 20 - Math.abs(offset) * 5;
          const baseOpacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.75 : 0.4;
          const opacity = isMounted ? baseOpacity : 0;

          return (
            <div
              key={service.id}
              className="absolute"
              style={{
                transform: `translateX(${xShift}px) translateY(40px) scale(${scale})`,
                zIndex, opacity,
                width: '450px', height: '320px',
                overflow: 'hidden', borderRadius: '12px',
                boxShadow: '0 4px 7px 0 rgba(0,0,0,0.6)',
                transition: isMounted ? 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
              }}
              onClick={() => !isCenter && goTo(i)}
            >
              <div 
                className={`${!isCenter ? 'cursor-pointer' : ''} h-full overflow-hidden relative`}
                style={{
                  borderRadius: '12px',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, black 100%)',
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, black 100%)',
                }}
              >
                <ImageWithFallback 
                  basePath={stripExtension(service.image)} 
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: 'center 20%' }}
                />
                <div 
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 68%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0.95) 100%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center" style={{ padding: '0 20px 20px' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`flex-shrink-0 flex items-center justify-center transition-all duration-500 ${isCenter ? 'bg-accent-500 text-white' : 'bg-accent-500/10 text-accent-400'}`} style={{ width: '34px', height: '34px' }}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-accent-400" style={{ fontSize: '20px' }}>
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-cream-100/70 leading-relaxed" style={{ fontSize: '13px' }}>
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center" style={{ paddingBottom: '50px' }}>
        <Link to="/services" className="text-accent-400 hover:text-accent-300 font-semibold transition-colors flex items-center gap-2" style={{ fontSize: '18px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
          All Services <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

/* ============ PROJECT CAROUSEL COMPONENT ============ */
function ProjectCarousel({ projects: items, activeIndex, onIndexChange }: { projects: Project[], activeIndex: number, onIndexChange: (i: number) => void }) {
  const [isMounted, setIsMounted] = useState(false);
  const total = items.length;

  const goTo = (index: number) => {
    onIndexChange(((index % total) + total) % total);
  };

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (!isMounted) return;
    const timer = setInterval(() => {
      onIndexChange((activeIndex + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total, isMounted, activeIndex, onIndexChange]);

  const getOffset = (i: number) => {
    let diff = i - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div className="relative flex-1 min-h-0 flex flex-col">
      <div className="flex-1 flex items-center justify-center relative">
        {items.map((project, i) => {
          const offset = getOffset(i);
          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 2;
          if (!isVisible) return null;

          const scale = isCenter ? 1.05 : Math.abs(offset) === 1 ? 0.85 : 0.75;
          const xShift = offset * 350;
          const zIndex = 20 - Math.abs(offset) * 5;
          const baseOpacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.65 : 0.35;
          const opacity = isMounted ? baseOpacity : 0;

          return (
            <div
              key={project.id}
              className="absolute"
              style={{
                transform: `translateX(${xShift}px) translateY(40px) scale(${scale})`,
                zIndex, opacity,
                width: '450px', height: '320px',
                overflow: 'hidden', borderRadius: '12px',
                boxShadow: isCenter ? '0 12px 40px rgba(0,0,0,0.8)' : '0 4px 7px 0 rgba(0,0,0,0.6)',
                transition: isMounted ? 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
              }}
              onClick={() => !isCenter && goTo(i)}
            >
              <div 
                className={`${!isCenter ? 'cursor-pointer' : ''} h-full overflow-hidden relative`}
                style={{
                  borderRadius: '12px',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
                }}
              >
                <img 
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: 'center 20%' }}
                />
                <div 
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 68%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0.95) 100%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center" style={{ padding: '0 20px 20px' }}>
                  <h3 className="font-semibold text-accent-400" style={{ fontSize: '20px', marginBottom: '4px' }}>
                    {project.name}
                  </h3>
                  <p className="text-cream-100/70 leading-relaxed" style={{ fontSize: '13px' }}>
                    {project.location} &middot; {project.units}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center" style={{ paddingBottom: '50px' }}>
        <Link to="/projects" className="text-accent-400 hover:text-accent-300 font-semibold transition-colors flex items-center gap-2" style={{ fontSize: '18px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
          All Projects <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [projectCarouselIndex, setProjectCarouselIndex] = useState(0);

  useSmoothSnap(1200);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % projects.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const current = projects[activeSlide];
  const s = current.settings;

  return (
    <div className="bg-dark-950">
      {/* ============ HERO SECTION ============ */}
      <section className="relative h-screen min-h-[700px] overflow-hidden snap-section">
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden opacity-35">
            <img
              src={current.image}
              alt=""
              className="absolute w-full h-full object-cover"
              style={{ filter: 'blur(18px)', transform: 'scale(1.2)' }}
            />
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <img
              key={current.id}
              src={current.image}
              alt=""
              className="absolute w-full h-full object-cover hero-zoom"
              style={{
                objectPosition: `${s.focusX}% ${s.focusYStart}%`,
                transformOrigin: `${s.focusX}% ${s.focusYStart}%`,
                '--zoom-from': s.zoomFrom,
                '--zoom-to': s.zoomTo,
                '--focus-x': `${s.focusX}%`,
                '--y-start': `${s.focusYStart}%`,
                '--y-end': `${s.focusYEnd}%`,
              } as React.CSSProperties}
            />
          </div>
          {/* Per-image dark overlay - brighter photos get stronger overlay */}
          <div className="absolute inset-0" style={{ background: `rgba(0, 0, 0, ${s.overlayOpacity})` }} />
          <div className="absolute inset-0 hero-text-backdrop" />
          <div className="absolute inset-x-0 top-0 h-40 hero-top-gradient" />
        </div>

        <div className="relative h-full w-full px-8 md:px-14 lg:px-20 xl:px-24">
          <div className="flex flex-col justify-center h-full pt-20">
            <div className="max-w-3xl">
              <p className="text-white font-bold tracking-[0.2em] uppercase text-base mb-4 animate-fade-in hero-text-strong">
                Your Complete Door, Hardware & Millwork Partner
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] animate-fade-in-up hero-text-strong">
                Opening Doors for<br />
                <span className="text-accent-400 whitespace-nowrap">Builders &amp; Developers</span>
              </h1>
              <p className="mt-3 text-white text-xl font-semibold animate-fade-in-up stagger-1 hero-text">Since 2019</p>
              <p className="mt-6 text-2xl lg:text-3xl text-white font-bold leading-relaxed animate-fade-in-up stagger-2 hero-text-strong">
                Doors &amp; millwork? Our problem. Not yours.
              </p>
              <p className="mt-2 text-lg lg:text-xl text-white/90 font-medium leading-relaxed max-w-lg animate-fade-in-up stagger-3 hero-text">
                From blueprint to punch list — one call, completely handled.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-4">
                <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary">
                  Get a Quote <ArrowRight className="w-5 h-5" />
                </a>
                <Link to="/projects" className="btn-outline">
                  View Projects
                </Link>
              </div>
              <div className="mt-2 flex flex-wrap gap-6 animate-fade-in-up stagger-5 hero-text-strong">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Check className="w-5 h-5 text-accent-400 stroke-[3]" />
                  Nationwide Delivery
                </div>
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Check className="w-5 h-5 text-accent-400 stroke-[3]" />
                  Professional Installation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INTRO SECTION ============ */}
      <section className="relative h-screen flex items-center overflow-hidden snap-section">
        <div className="absolute top-0 left-0 right-0 h-1 accent-divider z-10" />
        <div className="absolute inset-0">
          <img
            src="/images/backgrounds/intro.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 intro-text-backdrop" />
        </div>
        
        <div className="relative z-10 w-full">
          <div className="pl-[100px] mt-[85px]" style={{ maxWidth: '42%' }}>
            <h2 className="font-display lg:text-[43px] text-3xl md:text-4xl font-bold text-white leading-tight hero-text-strong animate-fade-in-up stagger-1 whitespace-nowrap mb-[6px]">
              Your Complete Partner for
            </h2>
            <h3 className="font-display lg:text-[60px] text-4xl md:text-5xl font-bold text-accent-400 leading-tight hero-text-strong animate-fade-in-up stagger-2">
              Doors, Hardware<br />&amp; Millwork
            </h3>
            <p className="mt-[200px] text-white text-[20px] leading-relaxed hero-text-strong animate-fade-in-up stagger-3 max-w-[500px]">
              Complete multifamily door and millwork packages — interior doors, 
              frames, hardware, trim, and moldings. From blueprint to punch list, 
              one call handles it all.
            </p>
            <div className="mt-[20px] flex items-center gap-[50px] animate-fade-in-up stagger-4">
              <Link to="/about" className="text-white font-bold text-[18px] hover:text-white/80 transition-colors hero-text-strong">
                About Us →
              </Link>
              <Link to="/services" className="text-white font-bold text-[18px] hover:text-white/80 transition-colors hero-text-strong">
                Our Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES SECTION ============ */}
      <section className="h-screen flex flex-col justify-center bg-dark-950 snap-section overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/backgrounds/services.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'blur(2px)', transform: 'scale(1.02)' }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.5) 100%)' }}
          />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center text-center" style={{ paddingTop: '120px', marginBottom: '20px' }}>
          <h2 className="font-display font-bold text-cream-100" style={{ fontSize: '48px', marginBottom: '12px', textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)' }}>
            Full-Service Solutions
          </h2>
          <p className="text-white font-semibold" style={{ fontSize: '18px', maxWidth: '620px', textShadow: '0 1px 3px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,0.9)' }}>
            From initial estimating through final punch list, we handle <span className="text-accent-400">every phase</span> of your door, hardware, and millwork scope.
          </p>
        </div>
        <ServiceCarousel services={services} />
      </section>

      {/* ============ FEATURED PROJECTS SECTION ============ */}
      <section className="h-screen flex flex-col justify-center bg-dark-900 snap-section overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/backgrounds/projects.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'blur(2px)', transform: 'scale(1.05)' }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%)' }}
          />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center text-center" style={{ paddingTop: '120px', marginBottom: '20px' }}>
          <h2 className="font-display font-bold text-cream-100" style={{ fontSize: '48px', marginBottom: '12px', textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)' }}>
            Featured Projects
          </h2>
          <p className="text-white font-semibold" style={{ fontSize: '18px', maxWidth: '620px', textShadow: '0 1px 3px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,0.9)' }}>
            A sample of recent multifamily and commercial work across the <span className="text-accent-400">Northeast and beyond</span>.
          </p>
        </div>
        <ProjectCarousel projects={projects} activeIndex={projectCarouselIndex} onIndexChange={setProjectCarouselIndex} />
      </section>

      {/* ============ CTA + FOOTER SECTION ============ */}
      <Footer isSnapSection />
    </div>
  );
}

export default HomePage;