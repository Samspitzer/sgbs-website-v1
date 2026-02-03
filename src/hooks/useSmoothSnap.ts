import { useEffect, useRef } from 'react';

export function useSmoothSnap(duration: number = 1000) {
  const isAnimating = useRef(false);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollTime = useRef(0);

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
          cooldownTimer.current = setTimeout(() => {
            isAnimating.current = false;
          }, 200);
        }
      };

      requestAnimationFrame(animate);
    };

    const findCurrentIndex = (sectionTops: number[], scrollY: number): number => {
      let currentIndex = 0;
      for (let i = 0; i < sectionTops.length; i++) {
        if (scrollY >= sectionTops[i] - 100) {
          currentIndex = i;
        }
      }
      return currentIndex;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isAnimating.current) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 150) return;
      lastScrollTime.current = now;

      if (Math.abs(e.deltaY) < 10) return;
      
      const sectionTops = getSectionTops();
      const currentY = window.scrollY;
      const direction = e.deltaY > 0 ? 1 : -1;

      const currentIndex = findCurrentIndex(sectionTops, currentY);
      const targetIndex = Math.max(0, Math.min(sectionTops.length - 1, currentIndex + direction));
      
      if (targetIndex !== currentIndex) {
        smoothScrollTo(sectionTops[targetIndex]);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      
      const sectionTops = getSectionTops();
      const currentY = window.scrollY;
      const currentIndex = findCurrentIndex(sectionTops, currentY);

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
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
    };
  }, [duration]);
}