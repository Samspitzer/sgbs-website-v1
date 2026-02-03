import { useEffect, useRef } from 'react';

export function useSmoothSectionScroll(sectionSelector: string = '.snap-section') {
  const scrollTimeout = useRef<number | null>(null);
  const isAnimating = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const sections = document.querySelectorAll(sectionSelector);
    if (sections.length === 0) return;

    const getClosestSection = (): Element | null => {
      let closest: Element | null = null;
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < minDistance) {
          minDistance = distance;
          closest = section;
        }
      });

      return closest;
    };

    const scrollToSection = (section: Element) => {
      const rect = section.getBoundingClientRect();
      
      // Only animate if we're not already very close (within 20px)
      if (Math.abs(rect.top) < 20) {
        isAnimating.current = false;
        return;
      }

      isAnimating.current = true;
      const targetY = rect.top + window.scrollY;
      const startY = window.scrollY;
      const distance = targetY - startY;
      const duration = 600; // Smooth 0.6 second animation
      let startTime: number | null = null;

      // Easing function for smooth deceleration
      const easeOutCubic = (t: number): number => {
        return 1 - Math.pow(1 - t, 3);
      };

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easedProgress = easeOutCubic(progress);
        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          isAnimating.current = false;
        }
      };

      requestAnimationFrame(animateScroll);
    };

    const handleScrollEnd = () => {
      // Don't snap if we're already animating
      if (isAnimating.current) return;
      
      // Check if scroll has actually stopped (position hasn't changed)
      if (Math.abs(window.scrollY - lastScrollY.current) > 5) {
        // Still moving, wait more
        lastScrollY.current = window.scrollY;
        scrollTimeout.current = window.setTimeout(handleScrollEnd, 100);
        return;
      }

      const closestSection = getClosestSection();
      if (closestSection) {
        scrollToSection(closestSection);
      }
    };

    const handleScroll = () => {
      // If we're in the middle of a snap animation, don't interrupt
      if (isAnimating.current) return;

      lastScrollY.current = window.scrollY;

      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Wait for scroll to stop, then snap to closest section
      scrollTimeout.current = window.setTimeout(handleScrollEnd, 100);
    };

    // Listen to scroll events (passive for performance)
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [sectionSelector]);
}