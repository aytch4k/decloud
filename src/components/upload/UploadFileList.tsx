import React from 'react';
import { formatFileSize } from '../../utils/formatters/size';

interface UploadFileListProps {
  files: File[];
}

export function UploadFileList({ files }: UploadFileListProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-2">Selected Files:</h3>
      <div className="max-h-40 overflow-y-auto">
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li 
              key={`${file.name}-${index}`}
              className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm"
            >
              <span className="truncate flex-1 mr-4">{file.name}</span>
              <span className="text-gray-500 whitespace-nowrap">
                {formatFileSize(file.size)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}