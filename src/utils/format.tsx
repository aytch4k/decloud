import React from 'react';
import { FileText, Image, File, Database } from 'lucide-react';

export function formatSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export function getStorageIcon(type: string) {
  switch (type.toLowerCase()) {
    case 'documents':
      return <FileText className="h-5 w-5 text-blue-500" />;
    case 'images':
      return <Image className="h-5 w-5 text-green-500" />;
    case 'videos':
      return <File className="h-5 w-5 text-purple-500" />;
    default:
      return <Database className="h-5 w-5 text-gray-500" />;
  }
}