import React from 'react';
import { Clock, Download, RotateCcw } from 'lucide-react';
import type { Version } from '../../types/file';

interface VersionHistoryProps {
  versions: Version[];
  onRestore: (versionId: string) => void;
  onDownload: (versionId: string) => void;
}

export function VersionHistory({ versions, onRestore, onDownload }: VersionHistoryProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium">Version History</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {versions.map((version) => (
          <div key={version.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Version from {version.timestamp.toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    By {version.author} • {version.size}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onDownload(version.id)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Download className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onRestore(version.id)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">{version.changes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}