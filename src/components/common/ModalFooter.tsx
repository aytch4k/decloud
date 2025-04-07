import React from 'react';

interface ModalFooterProps {
  onCancel: () => void;
  onConfirm: () => void;
  confirmText: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ModalFooter({
  onCancel,
  onConfirm,
  confirmText,
  isLoading = false,
  disabled = false
}: ModalFooterProps) {
  return (
    <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
      <button
        onClick={onCancel}
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        disabled={isLoading}
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={disabled || isLoading}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {confirmText}
      </button>
    </div>
  );
}