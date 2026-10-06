//hooks/useImageFallback.ts
//a reusable hook to handle image loading errors and provide a fallback mechanism for images in the application.

import { useState } from 'react';

export const useImageFallback = () => {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (id: string) => {
    setFailedImages((prev) => new Set(prev).add(id));
  };

  const hasFailed = (id: string) => failedImages.has(id);

  return { handleImageError, hasFailed };
};
