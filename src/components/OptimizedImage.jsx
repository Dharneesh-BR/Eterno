import { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false, // Set to true for above-the-fold images
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate WebP versions and fallbacks
  const generateSrcSet = (baseSrc) => {
    const baseName = baseSrc.replace(/\.[^/.]+$/, '');
    const extension = baseSrc.match(/\.[^/.]+$/)[0];
    
    return {
      webp: `${baseName}-small.webp 400w, ${baseName}-medium.webp 800w, ${baseName}.webp 1200w`,
      original: `${baseName}-small${extension} 400w, ${baseName}-medium${extension} 800w, ${baseSrc} 1200w`
    };
  };

  const srcSet = generateSrcSet(src);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {isInView && (
        <picture>
          {/* WebP sources */}
          <source
            type="image/webp"
            srcSet={srcSet.webp}
            sizes={sizes}
          />
          {/* Fallback to original format */}
          <img
            src={src}
            srcSet={srcSet.original}
            sizes={sizes}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            {...props}
          />
        </picture>
      )}
      
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage;
