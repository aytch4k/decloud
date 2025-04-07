import React from 'react';
import { X } from 'lucide-react';
import { EncryptionSelector } from '../upload/EncryptionSelector';
import type { FileMetadata, EncryptionTier } from '../../types/file';

interface SecurityModalProps {
  file: FileMetadata;
  onClose: () => void;
  onUpdateSecurity: (tier: EncryptionTier) => void;
}

export function SecurityModal({ file, onClose, onUpdateSecurity }: SecurityModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Security Settings - {file.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <EncryptionSelector
          selected={file.encryptionTier}
          onChange={onUpdateSecurity}
        />

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onUpdateSecurity(file.encryptionTier)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Update Security
          </button>
        </div>
      </div>
    </div>
  );
}