import React from 'react';

export const MicSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mic-svg-icon">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

export const WaveSVG = () => (
  <svg className="wave-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 50C20 40 30 40 40 50C50 60 60 60 70 50C80 40 90 40 100 50" stroke="currentColor" strokeWidth="4" />
    <path d="M0 65C10 55 20 55 30 65C40 75 50 75 60 65C70 55 80 55 90 65" stroke="currentColor" strokeWidth="4" />
  </svg>
);
