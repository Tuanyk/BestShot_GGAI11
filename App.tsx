
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { EmailForm, FormState } from './components/EmailForm';
import { GolfBallFlagIcon } from './components/Icons';
import { useKeyPressAndSwipe } from './hooks/useKeyPressAndSwipe';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

// --- TYPE DEFINITIONS ---
interface ScreenProps {
  isActive: boolean;
  onNext: () => void;
  onNotify: () => void;
}

// --- SCREEN COMPONENTS ---
// These are defined outside the main App component to prevent re-renders.

const ScreenWrapper: React.FC<{
  children: React.ReactNode;
  imageUrl: string;
  screenIndex: number;
  currentIndex: number;
  prefersReducedMotion: boolean;
}> = ({ children, imageUrl, screenIndex, currentIndex, prefersReducedMotion }) => {
  const offset = screenIndex - currentIndex;
  const parallaxOffset = offset * -20;

  const motionStyles = {
    transform: `translateX(${offset * 100}%)`,
    transition: prefersReducedMotion ? 'opacity 0.5s ease' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
  };

  const parallaxStyles = {
    transform: `translateX(${parallaxOffset}%) scale(1.2)`,
    transition: prefersReducedMotion ? 'opacity 0.5s ease' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
  };
  
  const opacity = offset === 0 ? 'opacity-100' : 'opacity-0';

  return (
    <section 
      aria-hidden={offset !== 0}
      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${prefersReducedMotion ? opacity : ''}`}
      style={prefersReducedMotion ? {} : motionStyles}
    >
       <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{
            backgroundImage: `url(${imageUrl})`,
            ...(prefersReducedMotion ? {} : parallaxStyles)
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      </div>
      <div className="relative z-10 w-full max-w-4xl px-8 text-center text-white">
        {children}
      </div>
    </section>
  );
};


const Screen1Hero: React.FC<ScreenProps> = ({ onNext, onNotify }) => (
    <>
        <div className="mb-4">
            <GolfBallFlagIcon className="w-20 h-20 mx-auto text-white" />
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mt-2">Best Shot</h1>
        </div>
        <p className="text-2xl md:text-4xl font-bold text-shadow-lg">Daily hole-in-one challenge</p>
        <p className="mt-2 text-lg md:text-xl text-gray-200 max-w-md mx-auto">Take your best shot daily and climb the ranks.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button onClick={onNext} className="bg-[#1FA36A] hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 shadow-lg">See How It Works</button>
            <button onClick={onNotify} className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 shadow-lg">Notify Me</button>
        </div>
        <p className="mt-8 text-sm text-gray-400">In Beta — iOS & Android coming soon.</p>
    </>
);

const Screen2WhatIs: React.FC<ScreenProps> = ({ onNext }) => (
    <>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">A quick-skill 3D golf game</h2>
        <p className="text-lg md:text-xl max-w-xl mx-auto mb-10">Aim, pull, release. Get the ball closest to the pin — <strong className="text-[#E9D7A4]">0.00 yds</strong> is perfection.</p>
        <div className="grid md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
            <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-[#E9D7A4]">One hole, every 24 hours</h3>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-[#E9D7A4]">Simple gesture controls</h3>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-[#E9D7A4]">Global leaderboard</h3>
            </div>
        </div>
        <div className="mt-10">
            <button onClick={onNext} className="bg-[#1FA36A] hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">Next</button>
        </div>
    </>
);

const Screen3HowItWorks: React.FC<ScreenProps> = ({ onNext, onNotify }) => (
    <>
        <h2 className="text-4xl md:text-5xl font-bold mb-8">How Best Shot works</h2>
        <ol className="grid md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto mb-8 text-lg">
            <li className="bg-white/10 p-4 rounded-lg flex items-start gap-4"><strong className="text-2xl text-[#1FA36A]">1.</strong><div><h3 className="font-bold">New hole daily</h3><p className="text-gray-300">A fresh 3D hole appears every 24 hours.</p></div></li>
            <li className="bg-white/10 p-4 rounded-lg flex items-start gap-4"><strong className="text-2xl text-[#1FA36A]">2.</strong><div><h3 className="font-bold">Practice shots</h3><p className="text-gray-300">Feel the wind and slopes first.</p></div></li>
            <li className="bg-white/10 p-4 rounded-lg flex items-start gap-4"><strong className="text-2xl text-[#1FA36A]">3.</strong><div><h3 className="font-bold">Best Shot</h3><p className="text-gray-300">One attempt <strong className="text-[#E9D7A4]">that counts</strong> to your score and streak.</p></div></li>
            <li className="bg-white/10 p-4 rounded-lg flex items-start gap-4"><strong className="text-2xl text-[#1FA36A]">4.</strong><div><h3 className="font-bold">Mulligan (optional)</h3><p className="text-gray-300">Not happy? Replace your Best Shot once.</p></div></li>
        </ol>
        <p className="text-base text-gray-300 max-w-xl mx-auto">Need more practice? Watch a short ad <strong className="text-[#E9D7A4]">or</strong> spend in-app currency <strong className="text-[#E9D7A4]">Tees</strong>. A practice shot costs fewer Tees than a Mulligan.</p>
        <div className="flex gap-4 justify-center mt-10">
             <button onClick={onNext} className="bg-[#1FA36A] hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">Next</button>
            <button onClick={onNotify} className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">Notify Me</button>
        </div>
    </>
);

const Screen4Controls: React.FC<ScreenProps> = ({ onNext }) => (
    <>
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Aim. Pull. Release.</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center max-w-3xl mx-auto mb-8">
            <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-[#E9D7A4]">Aim</h3>
                <p className="mt-2">Drag to set direction.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-[#E9D7A4]">Power</h3>
                <p className="mt-2">Pull back to set strength.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-[#E9D7A4]">Shoot</h3>
                <p className="mt-2">Release to swing.</p>
            </div>
        </div>
        <p className="text-lg text-gray-300">Tip: Haptics on hit • Subtle wind • Break reads</p>
         <div className="mt-10">
            <button onClick={onNext} className="bg-[#1FA36A] hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">Next</button>
        </div>
    </>
);

const CountUp: React.FC<{ end: number, duration?: number, decimals?: number, suffix?: string }> = ({ end, duration = 1500, decimals = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const startTime = Date.now();
        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const currentNum = progress * end;
            setCount(currentNum);
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return <span>{count.toFixed(decimals)}{suffix}</span>;
};


const Screen5Compete: React.FC<ScreenProps> = ({ onNext, onNotify, isActive }) => (
    <>
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Climb the ranks daily</h2>
        <div className="max-w-md mx-auto bg-white/10 p-6 rounded-lg mb-8">
            <h3 className="text-2xl font-bold text-left mb-4 text-[#E9D7A4]">Daily Leaderboard</h3>
            <ul className="text-left space-y-2 text-lg">
                <li className="flex justify-between"><span>#1 Player_One</span> <strong>{isActive && <CountUp end={0.07} />} yds</strong></li>
                <li className="flex justify-between"><span>#2 Player_Two</span> <strong>{isActive && <CountUp end={0.12} />} yds</strong></li>
                <li className="flex justify-between"><span>#3 Player_Three</span> <strong>{isActive && <CountUp end={0.19} />} yds</strong></li>
                <li className="flex justify-between text-gray-400"><span>...</span> <span>...</span></li>
                 <li className="flex justify-between"><span>#42 You</span> <strong>{isActive && <CountUp end={2.34} />} yds</strong></li>
            </ul>
        </div>
        <ul className="flex justify-center gap-4 text-lg">
            <li>Daily leaderboard</li>
            <li className="text-[#1FA36A]"> • </li>
            <li>Streaks</li>
            <li className="text-[#1FA36A]"> • </li>
            <li>Share your distance</li>
        </ul>
        <div className="flex gap-4 justify-center mt-10">
            <button onClick={onNext} className="bg-[#1FA36A] hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">Next</button>
            <button onClick={onNotify} className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">Notify Me</button>
        </div>
    </>
);

const Screen6Pricing: React.FC<ScreenProps> = ({ onNext, onNotify }) => (
    <>
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Free to play during Beta</h2>
        <div className="max-w-2xl mx-auto bg-white/5 rounded-lg overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-white/10">
                    <tr>
                        <th className="p-4">What you get</th>
                        <th className="p-4">Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-white/10">
                        <td className="p-4 font-semibold">Daily hole</td>
                        <td className="p-4">Always free during beta</td>
                    </tr>
                    <tr className="border-b border-white/10">
                        <td className="p-4 font-semibold">Practice shots</td>
                        <td className="p-4">Free starter allotment daily</td>
                    </tr>
                    <tr className="border-b border-white/10">
                        <td className="p-4 font-semibold">Extra practice</td>
                        <td className="p-4">Watch ad <strong className="text-[#E9D7A4]">or</strong> spend <em className="text-[#E9D7A4] not-italic">Tees</em></td>
                    </tr>
                    <tr className="border-b border-white/10">
                        <td className="p-4 font-semibold">Mulligan</td>
                        <td className="p-4">Costs more <em className="text-[#E9D7A4] not-italic">Tees</em> than a practice shot</td>
                    </tr>
                    <tr>
                        <td className="p-4 font-semibold">Tees</td>
                        <td className="p-4">Earn in app or purchase</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p className="mt-6 text-sm text-gray-400">Final pricing TBD. No pay-to-win — skill rules the leaderboard.</p>
        <div className="flex gap-4 justify-center mt-10">
            <button onClick={onNext} className="bg-[#1FA36A] hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">Next</button>
            <button onClick={onNotify} className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">Notify Me</button>
        </div>
    </>
);

const Screen7Signup: React.FC<{ onFormSubmit: (data: FormState) => void }> = ({ onFormSubmit }) => (
    <div className="w-full max-w-lg mx-auto bg-black/30 backdrop-blur-sm p-8 rounded-2xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Be first on the tee</h2>
        <EmailForm onFormSubmit={onFormSubmit} />
        <div className="mt-8 text-center text-gray-300">
            <p>Prefer Discord? <a href="#" className="text-[#1FA36A] font-semibold hover:underline">Join our community</a></p>
        </div>
        <footer className="mt-12 border-t border-white/20 pt-4 text-sm text-gray-400 flex justify-center gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Contact</a>
        </footer>
    </div>
);


// --- MAIN APP COMPONENT ---
export default function App() {
    const [currentScreen, setCurrentScreen] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();

    const screenData = useMemo(() => [
        { component: Screen1Hero, imageUrl: 'https://picsum.photos/seed/golf1/1920/1080' },
        { component: Screen2WhatIs, imageUrl: 'https://picsum.photos/seed/golf2/1920/1080' },
        { component: Screen3HowItWorks, imageUrl: 'https://picsum.photos/seed/golf3/1920/1080' },
        { component: Screen4Controls, imageUrl: 'https://picsum.photos/seed/golf4/1920/1080' },
        { component: Screen5Compete, imageUrl: 'https://picsum.photos/seed/golf5/1920/1080' },
        { component: Screen6Pricing, imageUrl: 'https://picsum.photos/seed/golf6/1920/1080' },
        { component: Screen7Signup, imageUrl: 'https://picsum.photos/seed/golf7/1920/1080' },
    ], []);

    const totalScreens = screenData.length;

    const handleNext = useCallback(() => {
        setCurrentScreen(s => Math.min(s + 1, totalScreens - 1));
    }, [totalScreens]);

    const handleBack = useCallback(() => {
        setCurrentScreen(s => Math.max(s - 1, 0));
    }, []);

    const handleGoTo = useCallback((index: number) => {
        if (index >= 0 && index < totalScreens) {
            setCurrentScreen(index);
        }
    }, [totalScreens]);
    
    const handleNotify = useCallback(() => setIsModalOpen(true), []);
    const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

    const handleFormSubmit = (data: FormState) => {
      console.log('Form submitted from modal:', data);
      // Here you would POST to your provider (e.g., Mailchimp/ConvertKit)
      // On success:
      handleCloseModal();
      // Optional: show a success toast
    };

    useKeyPressAndSwipe(handleNext, handleBack);

    useEffect(() => {
        const body = document.body;
        if (isModalOpen) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    }, [isModalOpen]);

    return (
        <main className="bg-[#0F4030] text-white w-screen h-screen overflow-hidden relative">
            <Header onNotify={handleNotify} />
            
            <div className="w-full h-full">
                {screenData.map((Screen, index) => {
                    const ScreenComponent = Screen.component;
                    return (
                        <ScreenWrapper
                            key={index}
                            screenIndex={index}
                            currentIndex={currentScreen}
                            imageUrl={Screen.imageUrl}
                            prefersReducedMotion={prefersReducedMotion}
                        >
                            <ScreenComponent
                                onNext={handleNext}
                                onNotify={handleNotify}
                                onFormSubmit={handleFormSubmit}
                                isActive={currentScreen === index}
                            />
                        </ScreenWrapper>
                    );
                })}
            </div>

            <Navigation
                current={currentScreen}
                total={totalScreens}
                onBack={handleBack}
                onNext={handleNext}
                onGoTo={handleGoTo}
            />

            {/* Email Signup Modal */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300"
                    onClick={handleCloseModal}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div 
                        className="bg-[#0F4030] border border-white/20 p-8 rounded-2xl w-full max-w-md relative shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={handleCloseModal} 
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 id="modal-title" className="text-3xl font-bold mb-4 text-center">Be first on the tee</h2>
                        <EmailForm onFormSubmit={handleFormSubmit} />
                    </div>
                </div>
            )}
        </main>
    );
}
