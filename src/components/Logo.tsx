import React from 'react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg width="24" height="32" viewBox="0 0 24 32" className="fill-brand-secondary">
        <path d="M12 0C12 0 1 12 1 19.5C1 25.5 5.5 30 12 30C18.5 30 23 25.5 23 19.5C23 12 12 0 12 0Z"/>
      </svg>
      <div className="flex flex-col justify-center translate-y-0.5">
        <span className="font-serif font-bold text-[1.75rem] leading-[0.8] text-brand-primary">tinta</span>
        <span className="font-sans font-medium text-[0.65rem] tracking-[0.34em] text-brand-primary mt-1">TUTUR</span>
      </div>
    </div>
  );
}
