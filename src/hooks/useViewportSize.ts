import { useState, useEffect } from "react";
import { breakpoints } from "../utils/constants/breakpoints";

interface ViewportSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const useViewportSize = (): ViewportSize => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const handleResize = (): void => {
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
