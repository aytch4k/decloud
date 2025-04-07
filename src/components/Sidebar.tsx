import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { UploadButton } from './common/UploadButton';
import { StorageIndicator } from './sidebar/StorageIndicator';
import { NavigationItem } from './sidebar/NavigationItem';
import { useSidebar } from '../context/SidebarContext';
import { useUpload } from '../context/UploadContext';
import { NAVIGATION_ITEMS } from '../constants/navigation';

export function Sidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();
  const { setShowUpload } = useUpload();

  return (
    <div 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-20'} 
        flex flex-col z-30`}
    >
      <div className="flex items-center justify-between p-4">
        {isExpanded && (
          <UploadButton 
            onClick={() => setShowUpload(true)}
            className="w-full justify-center"
          />
        )}
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-full hover:bg-gray-100 transition-all duration-300
            ${!isExpanded ? 'rotate-180 mx-auto' : 'absolute -right-4 top-6 bg-white border shadow-sm'}`}
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <ChevronLeft className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        {NAVIGATION_ITEMS.map((item) => (
          <NavigationItem
            key={item.name}
            item={item}
            isExpanded={isExpanded}
          />
        ))}
      </nav>

      {isExpanded && <StorageIndicator />}
    </div>
  );
}