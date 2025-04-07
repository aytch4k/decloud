import React from 'react';
import { History, Lock, Shield } from 'lucide-react';
import { FileIcon } from './FileIcon';
import { useUpload } from '../../context/UploadContext';
import type { FileMetadata } from '../../types/file';

interface FileCardProps {
  file: FileMetadata;
}

export function FileCard({ file }: FileCardProps) {
  const { setSelectedFile } = useUpload();

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <FileIcon type={file.type} />
          <div>
            <h3 className="text-sm font-medium text-gray-900">{file.name}</h3>
            <p className="text-xs text-gray-500">
              {file.type === 'folder' ? file.items : file.size}
            </p>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <Lock className="h-3 w-3 mr-1" />
              <span className="capitalize">{file.encryptionTier}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {file.versions && (
            <button
              onClick={() => setSelectedFile(file)}
              className="text-gray-400 hover:text-gray-500"
              title="Version History"
            >
              <History className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={() => setSelectedFile(file)}
            className="text-gray-400 hover:text-gray-500"
            title="Security Settings"
          >
            <Shield className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}