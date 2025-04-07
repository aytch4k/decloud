import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { UploadButton } from '../../common/UploadButton';
import { StorageIndicator } from './StorageIndicator';
import { NavigationList } from './NavigationList';
import { useSidebar } from '../../../context/SidebarContext';
import { useUpload } from '../../../context/UploadContext';

export function Sidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();
  const { setShowUpload } = useUpload();

  return (
    <aside 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-20'} 
        flex flex-col`}
      style={{ zIndex: 20 }}
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

      <NavigationList isExpanded={isExpanded} />
      {isExpanded && <StorageIndicator />}
    </aside>
  );
}