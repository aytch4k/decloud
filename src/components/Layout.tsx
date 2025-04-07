import React from 'react';
import { Navbar, Sidebar } from './navigation';
import { useSidebar } from '../context/SidebarContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main 
          className={`flex-1 transition-all duration-300 ease-in-out p-6
            ${isExpanded ? 'md:ml-64' : 'md:ml-20'}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}