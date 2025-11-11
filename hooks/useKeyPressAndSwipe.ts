
import { useEffect, useRef } from 'react';

export const useKeyPressAndSwipe = (onNext: () => void, onBack: () => void): void => {
    const touchStart = useRef<number | null>(null);
    const touchEnd = useRef<number | null>(null);
    const minSwipeDistance = 50;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                onNext();
            } else if (e.key === 'ArrowLeft') {
                onBack();
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchEnd.current = null;
            touchStart.current = e.targetTouches[0].clientX;
        };

        const handleTouchMove = (e: TouchEvent) => {
            touchEnd.current = e.targetTouches[0].clientX;
        };

        const handleTouchEnd = () => {
            if (!touchStart.current || !touchEnd.current) return;
            const distance = touchStart.current - touchEnd.current;
            const isLeftSwipe = distance > minSwipeDistance;
            const isRightSwipe = distance < -minSwipeDistance;

            if (isLeftSwipe) {
                onNext();
            } else if (isRightSwipe) {
                onBack();
            }
            touchStart.current = null;
            touchEnd.current = null;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [onNext, onBack]);
};
