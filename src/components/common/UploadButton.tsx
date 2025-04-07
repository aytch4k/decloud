import React from 'react';
import { Upload } from 'lucide-react';

interface UploadButtonProps {
  onClick: () => void;
  className?: string;
}

export function UploadButton({ onClick, className = '' }: UploadButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors ${className}`}
    >
      <Upload className="h-5 w-5" />
      <span>Upload Files</span>
    </button>
  );
}