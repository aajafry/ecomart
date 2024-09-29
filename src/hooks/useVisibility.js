import { useCallback, useEffect, useState } from 'react';

export const useVisibility = () => {
  const [visibility, setVisibility] = useState({
    ADD: false,
    EDIT: false,
    DELETE: false,
    UPDATE: false,
    REFUND: false,
    CANCEL: false,
    REVIEW: false
  });

  const openVisibility = useCallback((name) => {
    setVisibility(prev => ({ ...prev, [name]: true }));
  }, []);

  const closeVisibility = useCallback((name) => {
    setVisibility(prev => ({ ...prev, [name]: false }));
  }, []);

  useEffect(() => {
    const shouldHideOverflow = Object.values(visibility).some(Boolean);
    document.body.style.overflow = shouldHideOverflow ? "hidden" : "auto";
    return () => document.body.style.overflow = "auto";
  }, [visibility]);

  return {
    visibility,
    openVisibility,
    closeVisibility
  };
};