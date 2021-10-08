import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook that help knowing the mounting state of consuming component
 * @returns {object} returnObject
 * @returns {function} returnObject.isMounted -
 *  ... method to return boolean of mounting state of consuming component
 */
const useMountedState = () => {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const isMounted = useCallback(() => (mounted.current), []);
  return { isMounted };
};

export {
  useMountedState,
};
