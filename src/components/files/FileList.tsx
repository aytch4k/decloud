import React from 'react';
import { FileCard } from './FileCard';
import { useUpload } from '../../context/UploadContext';
import { formatFileSize } from '../../utils/formatters/size';

export function FileList() {
  const { files } = useUpload();

  if (!files || files.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No files found. Upload some files to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {files.map((file) => (
        <FileCard
          key={file.id}
          file={{
            ...file,
            size: typeof file.size === 'number' ? formatFileSize(file.size) : file.size
          }}
        />
      ))}
    </div>
  );
}