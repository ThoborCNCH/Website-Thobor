import { useState, useEffect } from "react";

const useLoadingManager = (totalImages) => {
  const [loadedImages, setLoadedImages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loadedImages >= totalImages) {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [loadedImages, totalImages]);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  return { isLoading, handleImageLoad };
};

export default useLoadingManager;
