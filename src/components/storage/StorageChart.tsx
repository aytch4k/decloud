import React from 'react';
import { StorageHistory } from '../../types/storage';
import { formatSize } from '../../utils/format';

interface StorageChartProps {
  data: StorageHistory[];
}

export function StorageChart({ data }: StorageChartProps) {
  return (
    <div className="h-64 relative">
      <div className="absolute inset-0 flex items-end space-x-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-1 bg-indigo-100 rounded-t hover:bg-indigo-200 transition-all group relative"
            style={{ height: `${(item.used / item.total) * 100}%` }}
          >
            <div className="invisible group-hover:visible absolute -top-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
              {new Date(item.date).toLocaleDateString()}
              <br />
              {formatSize(item.used)} used
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}