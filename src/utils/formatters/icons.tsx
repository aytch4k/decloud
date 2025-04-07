import React from 'react';
import { FileText, Image, File, Database } from 'lucide-react';

export function getFileIcon(type: string) {
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