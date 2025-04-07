import React from 'react';
import { File, FileText, Image, Folder } from 'lucide-react';

interface FileIconProps {
  type: string;
}

export function FileIcon({ type }: FileIconProps) {
  switch (type) {
    case 'folder':
      return <Folder className="h-10 w-10 text-indigo-600" />;
    case 'pdf':
      return <File className="h-10 w-10 text-red-500" />;
    case 'doc':
      return <FileText className="h-10 w-10 text-blue-500" />;
    case 'image':
      return <Image className="h-10 w-10 text-green-500" />;
    default:
      return <File className="h-10 w-10 text-gray-400" />;
  }
}