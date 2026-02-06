import { useEffect, useRef } from 'react';

/**
 * Smooth snap scrolling between .snap-section elements.
 * Disabled on mobile (<1024px) where content needs natural scroll.
 */
export function useSmoothSnap(duration: number = 1000) {
  const isAnimating = useRef(false);
  const targetSection = useRef(0);
  const animationId = useRef<number | null>(null);
  const wheelLocked = useRef(false);
  const wheelUnlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartY = useRef(0);
  const touchLocked = useRef(false);

  useEffect(() => {
    // Disable snap scrolling on screens < 1024px
    const isDesktop = () => window.innerWidth >= 1024;
    
    const sections = document.querySelectorAll('.snap-section');
    const totalSections = sections.length;
    if (totalSections === 0) return;

    const getCurrentSection = (): number => {
      return Math.round(window.scrollY / window.innerHeight);
    };

    const getTargetScroll = (index: number): number => {
      return index * window.innerHeight;
    };

    const smoothScrollTo = (sectionIndex: number, interrupt: boolean = false) => {
      const newTarget = Math.max(0, Math.min(totalSections - 1, sectionIndex));

      if (isAnimating.current && targetSection.current === newTarget && !interrupt) return;

      if (isAnimating.current && animationId.current) {
        cancelAnimationFrame(animationId.current);
        isAnimating.current = false;
      }

      const targetY = getTargetScroll(newTarget);
      const startY = window.scrollY;
      const distance = targetY - startY;

      if (Math.abs(distance) < 5) return;

      isAnimating.current = true;
      targetSection.current = newTarget;
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
          animationId.current = requestAnimationFrame(animate);
        } else {
          window.scrollTo(0, targetY);
          isAnimating.current = false;
          animationId.current = null;
        }
      };

      animationId.current = requestAnimationFrame(animate);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isDesktop()) return; // Let mobile scroll naturally

      e.preventDefault();
      e.stopPropagation();

      if (wheelUnlockTimer.current) {
        clearTimeout(wheelUnlockTimer.current);
      }
      wheelUnlockTimer.current = setTimeout(() => {
        wheelLocked.current = false;
      }, 800);

      if (wheelLocked.current) return;
      if (Math.abs(e.deltaY) < 5) return;

      wheelLocked.current = true;
      const direction = e.deltaY > 0 ? 1 : -1;
      const currentSection = getCurrentSection();
      smoothScrollTo(currentSection + direction);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!isDesktop()) return;
      touchStartY.current = e.touches[0].clientY;
      touchLocked.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDesktop()) return;
      if (touchLocked.current) {
        e.preventDefault();
        return;
      }

      const deltaY = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(deltaY) > 30) {
        e.preventDefault();
        touchLocked.current = true;
        const direction = deltaY > 0 ? 1 : -1;
        const currentSection = getCurrentSection();
        smoothScrollTo(currentSection + direction);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDesktop()) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' ||
          e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'Home' || e.key === 'End') {

        e.preventDefault();
        e.stopPropagation();

        let direction = 0;
        let absoluteTarget: number | null = null;

        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
          direction = 1;
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          direction = -1;
        } else if (e.key === 'Home') {
          absoluteTarget = 0;
        } else if (e.key === 'End') {
          absoluteTarget = totalSections - 1;
        }

        if (absoluteTarget !== null) {
          smoothScrollTo(absoluteTarget, true);
        } else if (direction !== 0) {
          if (isAnimating.current) {
            smoothScrollTo(targetSection.current + direction, true);
          } else {
            const currentSection = getCurrentSection();
            smoothScrollTo(currentSection + direction);
          }
        }
      }
    };

    const handleKeyDownCapture = (e: KeyboardEvent) => {
      if (!isDesktop()) return;
      if (e.key === ' ' || e.key === 'PageDown' || e.key === 'PageUp' ||
          e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDownCapture, { capture: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDownCapture, { capture: true });
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      if (animationId.current) cancelAnimationFrame(animationId.current);
      if (wheelUnlockTimer.current) clearTimeout(wheelUnlockTimer.current);
    };
  }, [duration]);
}