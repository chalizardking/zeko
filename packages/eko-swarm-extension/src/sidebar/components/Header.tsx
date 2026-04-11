import React from 'react';

interface HeaderProps {
  title: string;
  version: string;
}

export const Header: React.FC<HeaderProps> = ({ title, version }) => (
  <header className="flex items-center justify-between px-4 py-3 bg-eko-grey border-b border-eko-purple/20 shadow-lg">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-eko-purple rounded-full animate-pulse"></div>
      <h1 className="text-lg font-bold tracking-tight text-white">{title}</h1>
    </div>
    <span className="text-[10px] font-mono text-gray-500 bg-black/30 px-1.5 py-0.5 rounded border border-white/5">
      {version}
    </span>
  </header>
);
