
import React from 'react';

export const GolfBallFlagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <path d="M14.5 10.5h-4V18H9v-7.5H5V9h9.5z" />
        <path d="M14.5 6.5l-4-2-4 2v2h8v-2z" />
    </svg>
);


export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const LoadingSpinnerIcon: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const IosIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15.82 4.56a3.87 3.87 0 0 0-2.3 1.13c-.45.43-.88.9-1.29 1.45-.41-.55-.84-1.02-1.29-1.45a3.87 3.87 0 0 0-2.3-1.13 4 4 0 0 0-4.33 4.36c0 1.18.38 2.33 1.1 3.39.7.97 1.63 1.84 2.75 2.63 1.12.78 2.45 1.51 3.23 1.51h.04c.78 0 2.11-.73 3.23-1.51 1.12-.79 2.05-1.66 2.75-2.63.72-1.06 1.1-2.21 1.1-3.39a4 4 0 0 0-4.33-4.36Z"/>
  </svg>
);

const AndroidIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 18h-2a2 2 0 1 0 0-4h2V6H8v8h2a2 2 0 1 0 0 4H8"/>
    <path d="M7 14v-2"/>
    <path d="M17 14v-2"/>
    <path d="M6 10h.01"/>
    <path d="M18 10h.01"/>
  </svg>
);

const BothIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10 14 3 7v10h7"/><path d="m10 14 7-7h-7Z"/><path d="m10 14 7 7v-7Z"/><path d="M17 14V3h-7"/>
  </svg>
);

export const PlatformIcons = {
    ios: IosIcon,
    android: AndroidIcon,
    both: BothIcon,
};
