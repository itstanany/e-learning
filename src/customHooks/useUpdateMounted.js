import { useCallback } from 'react';
import { useMountedState } from './useMountedState';

/**
 * Custom hook that help update state in mounted components only
 * @returns {object} returnObject
 * @returns {function} returnObject.updateSt - method to update state on mounted components only
 */
const useUpdateMounted = () => {
  const { isMounted } = useMountedState();
  const updateSt = useCallback((setFn, ...args) => (isMounted() && setFn(...args)), [isMounted]);
  return { updateSt };
};

export {
  useUpdateMounted,
};
