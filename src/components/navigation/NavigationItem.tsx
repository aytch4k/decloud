import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface NavigationItemProps {
  item: {
    name: string;
    icon: LucideIcon;
    path: string;
    count?: number;
  };
  isExpanded: boolean;
}

export function NavigationItem({ item, isExpanded }: NavigationItemProps) {
  const { currentPath, navigateTo } = useNavigation();
  const isActive = currentPath === item.path;

  return (
    <button
      onClick={() => navigateTo(item.path)}
      className={`group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md
        transition-colors duration-200
        ${isActive 
          ? 'bg-indigo-50 text-indigo-600' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
        ${!isExpanded ? 'justify-center' : ''}`}
    >
      <item.icon className={`${isExpanded ? 'mr-3' : ''} h-5 w-5`} />
      {isExpanded && (
        <span className="flex-1">{item.name}</span>
      )}
      {isExpanded && item.count && (
        <span className="ml-2 text-xs font-semibold text-gray-500">
          {item.count}
        </span>
      )}
    </button>
  );
}