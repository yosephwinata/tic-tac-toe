import { useState, useEffect } from "react";

// These values must match the breakpoints defined in theme.ts
const breakpoints = {
  tablet: 768, // 768px = 48em
  desktop: 1024, // 1024px = 64em
};

const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportSize({
        isMobile: width < breakpoints.tablet,
        isTablet: width >= breakpoints.tablet && width < breakpoints.desktop,
        isDesktop: width >= breakpoints.desktop,
      });
    };

    // Update viewport size initially and on every window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures this runs once on mount and cleanup on unmount

  return viewportSize;
};

export default useViewportSize;
