import React from 'react';
import { StorageBreakdown as StorageBreakdownType } from '../../types/storage';
import { formatSize } from '../../utils/format';

interface StorageBreakdownProps {
  breakdown: StorageBreakdownType;
}

export function StorageBreakdown({ breakdown }: StorageBreakdownProps) {
  const total = Object.values(breakdown).reduce((acc, size) => acc + size, 0);

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-900 mb-3">Storage Breakdown</h3>
      <div className="space-y-2">
        {Object.entries(breakdown).map(([type, size]) => (
          <div key={type} className="flex items-center">
            <div className="flex-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 capitalize">{type}</span>
                <span className="text-gray-900">{formatSize(size)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div
                  className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(size / total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}