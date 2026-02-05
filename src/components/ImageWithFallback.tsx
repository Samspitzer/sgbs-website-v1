import { useState, useEffect } from 'react';

interface ImageWithFallbackProps {
  basePath: string; // e.g., '/images/services/estimating' (without extension)
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

export function ImageWithFallback({ basePath, alt, className, style }: ImageWithFallbackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageSrc, setImageSrc] = useState('');

  // Remove extension if one was provided
  const basePathClean = basePath.replace(/\.(jpg|jpeg|png|webp)$/i, '');

  useEffect(() => {
    setImageSrc(basePathClean + EXTENSIONS[0]);
    setCurrentIndex(0);
  }, [basePathClean]);

  const handleError = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < EXTENSIONS.length) {
      setCurrentIndex(nextIndex);
      setImageSrc(basePathClean + EXTENSIONS[nextIndex]);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
    />
  );
}

// Helper function to strip extension from image paths
export function stripExtension(path: string): string {
  return path.replace(/\.(jpg|jpeg|png|webp)$/i, '');
}