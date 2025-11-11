
import React, { useState, useEffect } from 'react';

const query = '(prefers-reduced-motion: reduce)';

export const usePrefersReducedMotion = (): boolean => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(
        () => typeof window !== 'undefined' && window.matchMedia(query).matches
    );

    useEffect(() => {
        if(typeof window === 'undefined') return;

        const mediaQueryList = window.matchMedia(query);
        const listener = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches);
        };

        mediaQueryList.addEventListener('change', listener);
        return () => {
            mediaQueryList.removeEventListener('change', listener);
        };
    }, []);

    return prefersReducedMotion;
};
