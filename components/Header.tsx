
import React from 'react';
import { GolfBallFlagIcon } from './Icons';

interface HeaderProps {
    onNotify: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNotify }) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-30 p-4 sm:p-6 flex justify-between items-center">
            <a href="#" className="flex items-center gap-3 text-white">
                <GolfBallFlagIcon className="w-8 h-8"/>
                <span className="font-bold text-xl">Best Shot</span>
            </a>
            <button
                onClick={onNotify}
                className="hidden sm:block bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-5 rounded-full text-sm transition-colors"
            >
                Notify Me
            </button>
        </header>
    );
};
