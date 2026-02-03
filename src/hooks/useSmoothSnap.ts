import { useEffect, useRef } from 'react';

export function useSmoothSnap(duration: number = 1000) {
  const isAnimating = useRef(false);
  const targetSection = useRef<number | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll('.snap-section');
    if (sections.length === 0) return;

    const getSectionTops = (): number[] => {
      return Array.from(sections).map(section => {
        const rect = section.getBoundingClientRect();
        return rect.top + window.scrollY;
      });
    };

    const smoothScrollTo = (targetY: number) => {
      if (isAnimating.current) return;
      
      isAnimating.current = true;
      const startY = window.scrollY;
      const distance = targetY - startY;
      
      // Don't animate if already there
      if (Math.abs(distance) < 10) {
        isAnimating.current = false;
        return;
      }

      let startTime: number | null = null;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        window.scrollTo(0, startY + distance * easeInOutCubic(progress));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          isAnimating.current = false;
          targetSection.current = null;
        }
      };

      requestAnimationFrame(animate);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      
      const sectionTops = getSectionTops();
      const currentY = window.scrollY;
      const direction = e.deltaY > 0 ? 1 : -1;

      // Find current section index
      let currentIndex = 0;
      for (let i = 0; i < sectionTops.length; i++) {
        if (currentY >= sectionTops[i] - 50) {
          currentIndex = i;
        }
      }

      // Calculate target section
      const targetIndex = Math.max(0, Math.min(sectionTops.length - 1, currentIndex + direction));
      
      if (targetIndex !== currentIndex || Math.abs(currentY - sectionTops[currentIndex]) > 50) {
        smoothScrollTo(sectionTops[targetIndex]);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      
      const sectionTops = getSectionTops();
      const currentY = window.scrollY;
      
      let currentIndex = 0;
      for (let i = 0; i < sectionTops.length; i++) {
        if (currentY >= sectionTops[i] - 50) {
          currentIndex = i;
        }
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        const targetIndex = Math.min(sectionTops.length - 1, currentIndex + 1);
        smoothScrollTo(sectionTops[targetIndex]);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const targetIndex = Math.max(0, currentIndex - 1);
        smoothScrollTo(sectionTops[targetIndex]);
      } else if (e.key === 'Home') {
        e.preventDefault();
        smoothScrollTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        smoothScrollTo(sectionTops[sectionTops.length - 1]);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [duration]);
}