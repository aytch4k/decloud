import React from 'react';
import { X } from 'lucide-react';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex justify-between items-center p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <button 
        onClick={onClose}
        className="text-gray-400 hover:text-gray-500 transition-colors"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  );
}