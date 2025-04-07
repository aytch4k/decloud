import React from 'react';
import { StorageChart } from './StorageChart';
import { StorageBreakdown } from './StorageBreakdown';
import { useStorage } from '../../hooks/useStorage';
import { formatSize, getStorageIcon } from '../../utils/format';

export function StorageView() {
  const { 
    totalSpace,
    usedSpace,
    breakdown,
    storageHistory
  } = useStorage();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Storage Overview</h2>
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Total Storage Used</span>
            <span className="text-gray-900">{formatSize(usedSpace)} of {formatSize(totalSpace)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(usedSpace / totalSpace) * 100}%` }}
            />
          </div>
        </div>
        <StorageChart data={storageHistory} />
        <StorageBreakdown breakdown={breakdown} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(breakdown).map(([type, size]) => (
          <div key={type} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3">
              {getStorageIcon(type)}
              <div>
                <p className="text-sm font-medium text-gray-900 capitalize">{type}</p>
                <p className="text-xs text-gray-500">{formatSize(size)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}