
import React from 'react';

interface NavigationProps {
    current: number;
    total: number;
    onBack: () => void;
    onNext: () => void;
    onGoTo: (index: number) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ current, total, onBack, onNext, onGoTo }) => {
    const isFirst = current === 0;
    const isLast = current === total - 1;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-30 p-4 sm:p-6 flex justify-between items-center bg-gradient-to-t from-black/50 to-transparent">
            <button
                onClick={onBack}
                disabled={isFirst}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 ${isFirst ? 'opacity-0 cursor-default' : 'bg-white/20 hover:bg-white/30'}`}
                aria-label="Previous Screen"
            >
                Back
            </button>

            <div className="flex items-center gap-2">
                {Array.from({ length: total }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onGoTo(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${current === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
                        aria-label={`Go to screen ${index + 1}`}
                        aria-current={current === index ? 'step' : undefined}
                    />
                ))}
            </div>

            <button
                onClick={onNext}
                disabled={isLast}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 ${isLast ? 'opacity-0 cursor-default' : 'bg-white/20 hover:bg-white/30'}`}
                aria-label="Next Screen"
            >
                Next
            </button>
        </nav>
    );
};
