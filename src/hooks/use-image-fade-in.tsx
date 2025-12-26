/**
 * useImageFadeIn - Lazy loading hook with smooth fade-in animation
 * 
 * Features:
 * - IntersectionObserver for lazy loading
 * - Smooth fade-in transition on load
 * - Dark gradient overlays for readability
 */

import React, { useState, useEffect, useRef } from 'react';

interface UseImageFadeInOptions {
  rootMargin?: string;
  threshold?: number;
}

export const useImageFadeIn = (options: UseImageFadeInOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const { rootMargin = '50px', threshold = 0.1 } = options;

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // IntersectionObserver for lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return { imgRef, isVisible, isLoaded, handleLoad };
};

// Component wrapper for easy use
export const LazyImage = ({
  src,
  alt,
  className = '',
  gradientOverlay = false,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  gradientOverlay?: boolean;
  [key: string]: any;
}) => {
  const { imgRef, isVisible, isLoaded, handleLoad } = useImageFadeIn();

  return (
    <div className="relative overflow-hidden">
      <img
        ref={imgRef}
        src={isVisible ? src : undefined}
        alt={alt}
        onLoad={handleLoad}
        className={`transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
      {gradientOverlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
      )}
    </div>
  );
};
