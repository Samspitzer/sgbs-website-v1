import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { services } from '../data/services';
import { useSmoothSnap } from '../hooks/useSmoothSnap';
import { ImageWithFallback, stripExtension } from '../components/ImageWithFallback';
import { Footer } from '../components/Footer';

type SlideSettings = { focusX: number; focusYStart: number; focusYEnd: number; zoomFrom: number; zoomTo: number; overlayOpacity: number; };
type Project = { id: number; name: string; location: string; units: string; image: string; settings: SlideSettings; };

const projects: Project[] = [
  { id: 1, name: '70 Fisk Street', location: 'Jersey City, NJ', units: '44 Units', image: '/images/projects/70-fisk-street.jpg', settings: { focusX: 0, focusYStart: 0, focusYEnd: 100, zoomFrom: 1.2, zoomTo: 1.03, overlayOpacity: 0.3 } },
  { id: 2, name: 'Halo Newark Phase 1', location: 'Newark, NJ', units: '303 Units', image: '/images/projects/halo-newark.jpg', settings: { focusX: 50, focusYStart: 0, focusYEnd: 96, zoomFrom: 1.03, zoomTo: 1.21, overlayOpacity: 0.3 } },
  { id: 3, name: 'Harrison Grand', location: 'Harrison, NY', units: '31 Units', image: '/images/projects/harrison-grand.jpg', settings: { focusX: 50, focusYStart: 50, focusYEnd: 50, zoomFrom: 1.1, zoomTo: 1.03, overlayOpacity: 0.3 } },
  { id: 4, name: 'Allure 258', location: 'East Orange, NJ', units: '203 Units', image: '/images/projects/allure-258.jpeg', settings: { focusX: 50, focusYStart: 50, focusYEnd: 50, zoomFrom: 1.1, zoomTo: 1.03, overlayOpacity: 0.3 } },
  { id: 5, name: 'Rainbow Village', location: 'Duluth, GA', units: '36 Units', image: '/images/projects/rainbow-village.jpg', settings: { focusX: 50, focusYStart: 50, focusYEnd: 50, zoomFrom: 1.1, zoomTo: 1.03, overlayOpacity: 0.25 } },
  { id: 6, name: '15 Parkview', location: 'Bronxville, NY', units: '60 Units', image: '/images/projects/15-parkview.jpg', settings: { focusX: 50, focusYStart: 0, focusYEnd: 88, zoomFrom: 1.23, zoomTo: 1.03, overlayOpacity: 0.3 } },
  { id: 7, name: 'Madison 2020', location: 'Reading, PA', units: '85 Units', image: '/images/projects/madison-2020.jpg', settings: { focusX: 50, focusYStart: 100, focusYEnd: 0, zoomFrom: 1.02, zoomTo: 1.2, overlayOpacity: 0.05 } },
  { id: 8, name: 'Jersey Walk', location: 'Jersey City, NJ', units: '274 Units', image: '/images/projects/jersey-walk.jpg', settings: { focusX: 0, focusYStart: 100, focusYEnd: 38, zoomFrom: 1.29, zoomTo: 1.03, overlayOpacity: 0.1 } },
];

/* ============ RESPONSIVE CAROUSEL ============ */
function useCarouselSize() {
  const [dims, setDims] = useState({ cardW: 420, cardH: 300, offset: 380, maxVisible: 2 });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1800) {
        setDims({ cardW: 420, cardH: 300, offset: 380, maxVisible: 2 });
      } else if (w >= 1536) {
        setDims({ cardW: 340, cardH: 245, offset: 320, maxVisible: 2 });
      } else if (w >= 1280) {
        // Standard laptops: 3 visible, generous gaps
        setDims({ cardW: 280, cardH: 200, offset: 310, maxVisible: 1 });
      } else {
        // Small laptops (1024-1279): 3 visible, tight but no overlap
        setDims({ cardW: 240, cardH: 175, offset: 270, maxVisible: 1 });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return dims;
}

/* ============ SERVICE CAROUSEL ============ */
function ServiceCarousel({ services: items }: { services: typeof services }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const total = items.length;
  const touchStartX = useRef(0);
  const { cardW, cardH, offset, maxVisible } = useCarouselSize();

  const goTo = useCallback((index: number) => setActiveIndex(((index % total) + total) % total), [total]);
  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => { if (!isMounted) return; const t = setInterval(() => setActiveIndex(p => (p + 1) % total), 4000); return () => clearInterval(t); }, [total, isMounted]);

  const getOffset = (i: number) => { let d = i - activeIndex; if (d > total / 2) d -= total; if (d < -total / 2) d += total; return d; };
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => { const d = touchStartX.current - e.changedTouches[0].clientX; if (Math.abs(d) > 50) goTo(activeIndex + (d > 0 ? 1 : -1)); };

  return (
    <div className="relative flex-1 min-h-0 flex flex-col">
      <div className="hidden lg:flex flex-1 items-center justify-center relative">
        {items.map((service, i) => {
          const Icon = service.icon;
          const off = getOffset(i);
          const absOff = Math.abs(off);
          if (absOff > maxVisible) return null;
          const isCenter = off === 0;
          const scale = isCenter ? 1 : absOff === 1 ? 0.82 : 0.65;
          const opacity = isMounted ? (isCenter ? 1 : absOff === 1 ? 0.55 : 0.2) : 0;

          return (
            <div key={service.id} className="absolute" style={{
              transform: `translateX(${off * offset}px) translateY(30px) scale(${scale})`,
              zIndex: 20 - absOff * 5, opacity, width: `${cardW}px`, height: `${cardH}px`,
              overflow: 'hidden', borderRadius: '12px',
              boxShadow: isCenter ? '0 12px 40px rgba(0,0,0,0.8)' : '0 4px 7px rgba(0,0,0,0.6)',
              transition: isMounted ? 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            }} onClick={() => !isCenter && goTo(i)}>
              <div className={`${!isCenter ? 'cursor-pointer' : ''} h-full overflow-hidden relative`} style={{ borderRadius: '12px', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, black 100%)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, black 100%)' }}>
                <ImageWithFallback basePath={stripExtension(service.image)} alt={service.title} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 68%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0.95) 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center p-3 2xl:p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`flex-shrink-0 w-7 h-7 2xl:w-[34px] 2xl:h-[34px] flex items-center justify-center transition-all duration-500 ${isCenter ? 'bg-accent-500 text-white' : 'bg-accent-500/10 text-accent-400'}`}><Icon className="w-3.5 h-3.5" /></div>
                    <h3 className="font-semibold text-accent-400 text-sm 2xl:text-lg">{service.title}</h3>
                  </div>
                  <p className="text-cream-100/70 leading-relaxed text-[10px] xl:text-[11px] 2xl:text-[13px]">{service.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex-1 flex flex-col items-center justify-center px-6 py-8" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {(() => { const s = items[activeIndex]; const Icon = s.icon; return (
          <div className="w-full max-w-sm overflow-hidden rounded-xl" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <ImageWithFallback basePath={stripExtension(s.image)} alt={s.title} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.95) 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-5"><div className="flex items-center gap-3 mb-2"><div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-accent-500 text-white"><Icon className="w-4 h-4" /></div><h3 className="font-semibold text-accent-400 text-lg">{s.title}</h3></div><p className="text-cream-100/70 text-sm leading-relaxed">{s.description}</p></div>
            </div>
          </div>
        ); })()}
        <div className="flex items-center gap-4 mt-5">
          <button onClick={() => goTo(activeIndex - 1)} className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/70"><ChevronLeft className="w-5 h-5" /></button>
          <div className="flex gap-2">{items.map((_, i) => (<button key={i} onClick={() => goTo(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-accent-500' : 'w-2 bg-white/30'}`} />))}</div>
          <button onClick={() => goTo(activeIndex + 1)} className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/70"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="flex items-center justify-center pb-3 lg:pb-4 2xl:pb-[50px]">
        <Link to="/services" className="text-accent-400 hover:text-accent-300 font-semibold transition-colors flex items-center gap-2 text-sm lg:text-base" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>All Services <ArrowRight className="w-5 h-5" /></Link>
      </div>
    </div>
  );
}

/* ============ PROJECT CAROUSEL ============ */
function ProjectCarousel({ projects: items, activeIndex, onIndexChange }: { projects: Project[], activeIndex: number, onIndexChange: (i: number) => void }) {
  const [isMounted, setIsMounted] = useState(false);
  const total = items.length;
  const touchStartX = useRef(0);
  const { cardW, cardH, offset, maxVisible } = useCarouselSize();

  const goTo = useCallback((index: number) => onIndexChange(((index % total) + total) % total), [total, onIndexChange]);
  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => { if (!isMounted) return; const t = setInterval(() => onIndexChange((activeIndex + 1) % total), 4000); return () => clearInterval(t); }, [total, isMounted, activeIndex, onIndexChange]);

  const getOffset = (i: number) => { let d = i - activeIndex; if (d > total / 2) d -= total; if (d < -total / 2) d += total; return d; };
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => { const d = touchStartX.current - e.changedTouches[0].clientX; if (Math.abs(d) > 50) goTo(activeIndex + (d > 0 ? 1 : -1)); };

  return (
    <div className="relative flex-1 min-h-0 flex flex-col">
      <div className="hidden lg:flex flex-1 items-center justify-center relative">
        {items.map((project, i) => {
          const off = getOffset(i);
          const absOff = Math.abs(off);
          if (absOff > maxVisible) return null;
          const isCenter = off === 0;
          const scale = isCenter ? 1.05 : absOff === 1 ? 0.82 : 0.62;
          const opacity = isMounted ? (isCenter ? 1 : absOff === 1 ? 0.5 : 0.18) : 0;

          return (
            <div key={project.id} className="absolute" style={{
              transform: `translateX(${off * offset}px) translateY(30px) scale(${scale})`,
              zIndex: 20 - absOff * 5, opacity, width: `${cardW}px`, height: `${cardH}px`,
              overflow: 'hidden', borderRadius: '12px',
              boxShadow: isCenter ? '0 12px 40px rgba(0,0,0,0.8)' : '0 4px 7px rgba(0,0,0,0.6)',
              transition: isMounted ? 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            }} onClick={() => !isCenter && goTo(i)}>
              <div className={`${!isCenter ? 'cursor-pointer' : ''} h-full overflow-hidden relative`} style={{ borderRadius: '12px', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)' }}>
                <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 68%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0.95) 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center p-3 2xl:p-5">
                  <h3 className="font-semibold text-accent-400 text-sm 2xl:text-lg mb-0.5">{project.name}</h3>
                  <p className="text-cream-100/70 leading-relaxed text-[10px] xl:text-[11px] 2xl:text-[13px]">{project.location} &middot; {project.units}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex-1 flex flex-col items-center justify-center px-6 py-8" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {(() => { const p = items[activeIndex]; return (
          <div className="w-full max-w-sm overflow-hidden rounded-xl" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.95) 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-center"><h3 className="font-semibold text-accent-400 text-lg mb-1">{p.name}</h3><p className="text-cream-100/70 text-sm">{p.location} · {p.units}</p></div>
            </div>
          </div>
        ); })()}
        <div className="flex items-center gap-4 mt-5">
          <button onClick={() => goTo(activeIndex - 1)} className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/70"><ChevronLeft className="w-5 h-5" /></button>
          <div className="flex gap-1.5">{items.map((_, i) => (<button key={i} onClick={() => goTo(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-5 bg-accent-500' : 'w-1.5 bg-white/30'}`} />))}</div>
          <button onClick={() => goTo(activeIndex + 1)} className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/70"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="flex items-center justify-center pb-3 lg:pb-4 2xl:pb-[50px]">
        <Link to="/projects" className="text-accent-400 hover:text-accent-300 font-semibold transition-colors flex items-center gap-2 text-sm lg:text-base" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>All Projects <ArrowRight className="w-5 h-5" /></Link>
      </div>
    </div>
  );
}

/* ============ HOMEPAGE ============ */
export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [projectCarouselIndex, setProjectCarouselIndex] = useState(0);
  useSmoothSnap(1200);
  useEffect(() => { const t = setInterval(() => setActiveSlide(p => (p + 1) % projects.length), 8000); return () => clearInterval(t); }, []);

  const current = projects[activeSlide];
  const s = current.settings;

  return (
    <div className="bg-dark-950">
      {/* HERO */}
      <section className="relative min-h-screen lg:h-screen overflow-hidden snap-section">
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden opacity-35"><img src={current.image} alt="" className="absolute w-full h-full object-cover" style={{ filter: 'blur(18px)', transform: 'scale(1.2)' }} /></div>
          <div className="absolute inset-0 overflow-hidden">
            <img key={current.id} src={current.image} alt="" className="absolute w-full h-full object-cover hero-zoom" style={{
              objectPosition: `${s.focusX}% ${s.focusYStart}%`, transformOrigin: `${s.focusX}% ${s.focusYStart}%`,
              '--zoom-from': s.zoomFrom, '--zoom-to': s.zoomTo, '--focus-x': `${s.focusX}%`, '--y-start': `${s.focusYStart}%`, '--y-end': `${s.focusYEnd}%`,
            } as React.CSSProperties} />
          </div>
          <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${s.overlayOpacity})` }} />
          <div className="absolute inset-0 hero-text-backdrop" />
          <div className="absolute inset-x-0 top-0 h-40 hero-top-gradient" />
        </div>
        <div className="relative h-full w-full px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-24">
          <div className="flex flex-col justify-center min-h-screen lg:h-full pt-24 pb-12 lg:pt-20 lg:pb-0">
            <div className="max-w-3xl">
              <p className="text-white font-bold tracking-[0.15em] uppercase text-sm mb-3 animate-fade-in hero-text-strong">Your Complete Door, Hardware & Millwork Partner</p>
              <h1 className="font-display text-[2.25rem] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-[1.1] animate-fade-in-up hero-text-strong">Opening Doors for<br /><span className="text-accent-400">Builders &amp; Developers</span></h1>
              <p className="mt-3 text-white text-lg font-semibold animate-fade-in-up stagger-1 hero-text">Since 2019</p>
              <p className="mt-4 text-xl lg:text-2xl xl:text-3xl text-white font-bold leading-relaxed animate-fade-in-up stagger-2 hero-text-strong">Doors &amp; millwork? Our problem. Not yours.</p>
              <p className="mt-2 text-base lg:text-lg text-white/90 font-medium leading-relaxed max-w-lg animate-fade-in-up stagger-3 hero-text">From blueprint to punch list — one call, completely handled.</p>
              <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up stagger-4">
                <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary">Get a Quote <ArrowRight className="w-5 h-5" /></a>
                <Link to="/projects" className="btn-outline">View Projects</Link>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 lg:gap-6 animate-fade-in-up stagger-5 hero-text-strong">
                <div className="flex items-center gap-2 text-white font-bold text-sm"><Check className="w-5 h-5 text-accent-400 stroke-[3]" /> Nationwide Delivery</div>
                <div className="flex items-center gap-2 text-white font-bold text-sm"><Check className="w-5 h-5 text-accent-400 stroke-[3]" /> Professional Installation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="relative min-h-screen lg:h-screen flex items-center overflow-hidden snap-section">
        <div className="absolute top-0 left-0 right-0 h-1 accent-divider z-10" />
        <div className="absolute inset-0">
          <img src="/images/backgrounds/intro.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 intro-text-backdrop" />
          <div className="absolute inset-0 bg-black/30 lg:bg-transparent" />
        </div>
        <div className="hidden lg:block absolute inset-y-0 left-0 w-[60%]" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.15) 80%, transparent 100%)' }} />
        <div className="relative z-10 w-full px-6 md:px-10 lg:px-0">
          <div className="lg:pl-12 xl:pl-16 2xl:pl-[100px] pt-24 pb-12 lg:pt-0 lg:pb-0 lg:mt-8 xl:mt-12 2xl:mt-[85px] max-w-full lg:max-w-[52%] xl:max-w-[48%] 2xl:max-w-[42%]">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] xl:text-[2.5rem] 2xl:text-[43px] font-bold text-white leading-tight hero-text-strong animate-fade-in-up stagger-1 mb-[6px]">Your Complete Partner for</h2>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.5rem] 2xl:text-[60px] font-bold text-accent-400 leading-tight hero-text-strong animate-fade-in-up stagger-2">Doors, Hardware<br />&amp; Millwork</h3>
            <p className="mt-8 lg:mt-10 xl:mt-14 2xl:mt-[200px] text-white text-base lg:text-lg leading-relaxed hero-text-strong animate-fade-in-up stagger-3 max-w-[500px]">
              Complete multifamily door and millwork packages — interior doors, frames, hardware, trim, and moldings. From blueprint to punch list, one call handles it all.
            </p>
            <div className="mt-5 flex items-center gap-6 lg:gap-8 animate-fade-in-up stagger-4">
              <Link to="/about" className="text-white font-bold text-base lg:text-lg hover:text-white/80 transition-colors hero-text-strong">About Us →</Link>
              <Link to="/services" className="text-white font-bold text-base lg:text-lg hover:text-white/80 transition-colors hero-text-strong">Our Services →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — explicit top padding, no justify-center */}
      <section className="min-h-screen lg:h-screen flex flex-col bg-dark-950 snap-section overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <img src="/images/backgrounds/services.jpg" alt="" className="w-full h-full object-cover" style={{ filter: 'blur(2px)', transform: 'scale(1.02)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.5) 100%)' }} />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center text-center px-6 pt-20 lg:pt-[96px] xl:pt-[100px] 2xl:pt-[120px] mb-1 lg:mb-2">
          <h2 className="font-display font-bold text-cream-100 text-2xl sm:text-3xl lg:text-[1.75rem] xl:text-[2rem] 2xl:text-[48px] mb-1.5 lg:mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)' }}>Full-Service Solutions</h2>
          <p className="text-white font-semibold text-sm lg:text-sm xl:text-base max-w-[580px]" style={{ textShadow: '0 1px 3px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,0.9)' }}>
            From initial estimating through final punch list, we handle <span className="text-accent-400">every phase</span> of your door, hardware, and millwork scope.
          </p>
        </div>
        <ServiceCarousel services={services} />
      </section>

      {/* PROJECTS — explicit top padding */}
      <section className="min-h-screen lg:h-screen flex flex-col bg-dark-900 snap-section overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <img src="/images/backgrounds/projects.jpg" alt="" className="w-full h-full object-cover" style={{ filter: 'blur(2px)', transform: 'scale(1.05)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%)' }} />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center text-center px-6 pt-20 lg:pt-[96px] xl:pt-[100px] 2xl:pt-[120px] mb-1 lg:mb-2">
          <h2 className="font-display font-bold text-cream-100 text-2xl sm:text-3xl lg:text-[1.75rem] xl:text-[2rem] 2xl:text-[48px] mb-1.5 lg:mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)' }}>Featured Projects</h2>
          <p className="text-white font-semibold text-sm lg:text-sm xl:text-base max-w-[580px]" style={{ textShadow: '0 1px 3px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,0.9)' }}>
            A sample of recent multifamily and commercial work across the <span className="text-accent-400">Northeast and beyond</span>.
          </p>
        </div>
        <ProjectCarousel projects={projects} activeIndex={projectCarouselIndex} onIndexChange={setProjectCarouselIndex} />
      </section>

      <Footer isSnapSection />
    </div>
  );
}

export default HomePage;