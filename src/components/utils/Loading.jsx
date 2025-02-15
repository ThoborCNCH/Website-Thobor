import { useState, useEffect } from "react";

const useLoadingManager = (totalImages, timeoutDuration = 8000) => {
  const [loadedImages, setLoadedImages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setTimeoutReached(true);
    }, timeoutDuration);

    return () => clearTimeout(timeout);
  }, [timeoutDuration]);

  useEffect(() => {
    if (loadedImages >= totalImages) {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [loadedImages, totalImages]);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  return { isLoading, handleImageLoad, timeoutReached };
};

export default useLoadingManager;