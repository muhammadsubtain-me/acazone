import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition component wraps the application routes and handles
 * page switching with a smooth fade-out and fade-in transition and delay.
 */
export default function PageTransition({ children }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const timeoutRef = useRef(null);

  useEffect(() => {
    // If the path has changed, trigger the transition
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');

      // Clear any existing transition timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Switch the page content and start fade-in after a 150ms delay
      timeoutRef.current = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
        // Instantly scroll to the top of the page when the content switches
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 150); // 150ms delay
    }
  }, [location, displayLocation]);

  // Clean up timer on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`page-transition-wrapper ${
        transitionStage === 'fadeIn' ? 'page-transition-fade-in' : 'page-transition-fade-out'
      }`}
    >
      {children(displayLocation)}
    </div>
  );
}
