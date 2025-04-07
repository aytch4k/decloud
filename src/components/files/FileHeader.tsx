import React from 'react';
import { UploadButton } from '../common/UploadButton';

interface FileHeaderProps {
  onUpload: () => void;
}

export function FileHeader({ onUpload }: FileHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">My Files</h2>
      <UploadButton onClick={onUpload} />
    </div>
  );
}