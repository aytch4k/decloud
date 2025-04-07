import React from 'react';
import { NavigationItem } from './NavigationItem';
import { NAVIGATION_ITEMS } from '../../constants/navigation';

interface NavigationListProps {
  isExpanded: boolean;
}

export function NavigationList({ isExpanded }: NavigationListProps) {
  return (
    <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
      {NAVIGATION_ITEMS.map((item) => (
        <NavigationItem
          key={item.name}
          item={item}
          isExpanded={isExpanded}
        />
      ))}
    </nav>
  );
}