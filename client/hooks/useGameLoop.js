import { useEffect, useRef } from 'react';

export const useGameLoop = (callback, isActive = true, fps = 60) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const intervalRef = useRef(1000 / fps);

  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        
        if (deltaTime >= intervalRef.current) {
          callback();
          previousTimeRef.current = time - (deltaTime % intervalRef.current);
        }
      } else {
        previousTimeRef.current = time;
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    if (isActive) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback, isActive, fps]);
};