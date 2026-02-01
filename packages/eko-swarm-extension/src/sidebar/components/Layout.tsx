import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="flex flex-col h-screen bg-eko-dark text-gray-200">
    {children}
  </div>
);
