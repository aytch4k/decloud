import React from 'react';

export function StorageIndicator() {
  return (
    <div className="p-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">Storage</span>
          <span className="text-sm font-medium text-indigo-600">75% used</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: '75%' }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">15GB of 20GB used</p>
      </div>
    </div>
  );
}