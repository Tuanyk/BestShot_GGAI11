
import React, { useState, FormEvent } from 'react';
import { CheckCircleIcon, LoadingSpinnerIcon, PlatformIcons } from './Icons';

export interface FormState {
    email: string;
    platform: 'ios' | 'android' | 'both';
}

interface EmailFormProps {
    onFormSubmit: (data: FormState) => void;
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

export const EmailForm: React.FC<EmailFormProps> = ({ onFormSubmit }) => {
    const [email, setEmail] = useState('');
    const [platform, setPlatform] = useState<'ios' | 'android' | 'both'>('ios');
    const [status, setStatus] = useState<SubmissionStatus>('idle');
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            setStatus('error');
            return;
        }
        setError('');
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            onFormSubmit({ email, platform });
            setStatus('success');
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className="text-center p-4 bg-green-500/20 text-[#1FA36A] rounded-lg">
                <CheckCircleIcon className="w-12 h-12 mx-auto mb-4 text-[#1FA36A]" />
                <h3 className="text-2xl font-bold text-white">You're on the list!</h3>
                <p className="mt-2 text-gray-200">We'll email you at <strong className="text-white">{email}</strong> when we launch.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.best.shot@example.com"
                    className="w-full bg-white/10 border-white/20 border text-white rounded-lg p-3 focus:ring-[#1FA36A] focus:border-[#1FA36A] transition"
                    required
                    aria-describedby={error ? "email-error" : undefined}
                />
                 {status === 'error' && error && <p id="email-error" className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            <div>
                 <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
                 <div className="grid grid-cols-3 gap-2">
                    {(['ios', 'android', 'both'] as const).map((p) => {
                        const Icon = PlatformIcons[p];
                        return (
                            <button
                                type="button"
                                key={p}
                                onClick={() => setPlatform(p)}
                                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${platform === p ? 'bg-[#1FA36A] border-[#1FA36A]' : 'bg-white/10 border-transparent hover:border-white/50'}`}
                            >
                                <Icon className="w-6 h-6 mb-1"/>
                                <span className="text-sm capitalize">{p}</span>
                            </button>
                        )
                    })}
                 </div>
            </div>

            <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#1FA36A] hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 disabled:bg-green-700 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {status === 'loading' ? <LoadingSpinnerIcon /> : 'Notify Me'}
            </button>
            <p className="text-xs text-gray-400 text-center">By signing up you agree to receive a single launch email and occasional updates. Unsubscribe anytime.</p>
        </form>
    );
};
