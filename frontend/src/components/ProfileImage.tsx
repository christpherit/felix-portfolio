import React, { useState, useEffect } from 'react';

interface ProfileImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src || '');
  const [retried, setRetried] = useState(false);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    setImgSrc(src || '');
    setRetried(false);
    setFallback(false);
  }, [src]);

  const handleError = () => {
    if (!retried && imgSrc) {
      setRetried(true);
      // Re-trigger load by appending a dummy query parameter to bypass cache/retry
      const separator = imgSrc.includes('?') ? '&' : '?';
      setImgSrc(imgSrc + separator + 'retry=1');
    } else {
      setFallback(true);
    }
  };

  if (fallback || !imgSrc) {
    // Elegant silhouette SVG placeholder as requested
    return (
      <div className={`${className} bg-zinc-200/80 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-400 dark:text-zinc-500`}>
        <svg className="w-1/2 h-1/2 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};
export default ProfileImage;
