import { useState, useEffect } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    
    const handleResize = (e) => {
      setIsMobile(e.matches);
    };

    // Add listener
    mediaQuery.addListener(handleResize);

    // Clean up
    return () => mediaQuery.removeListener(handleResize);
  }, []);

  return isMobile;
};

export default useIsMobile;
