import React, { useState } from 'react';
import { Folder } from 'lucide-react';
import { useFileSystemAccess } from '../../../hooks/useFileSystemAccess';

interface FolderInputProps {
  value: string;
  onChange: (path: string) => void;
  placeholder?: string;
}

export function FolderInput({ value, onChange, placeholder }: FolderInputProps) {
  const { selectDirectory, error: fsError, isSelecting } = useFileSystemAccess();
  const [error, setError] = useState<string | null>(null);

  const handleBrowse = async () => {
    try {
      setError(null);
      const path = await selectDirectory();
      onChange(path);
    } catch (err) {
      console.error('Failed to select folder:', err);
      setError(err instanceof Error ? err.message : 'Failed to select folder');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <div className="flex">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="block w-full rounded-l-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="button"
          onClick={handleBrowse}
          disabled={isSelecting}
          className={`
            inline-flex items-center rounded-r-md border border-l-0 border-gray-300 
            px-3 py-2 text-sm font-medium
            ${isSelecting 
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          `}
        >
          <Folder className="h-4 w-4 mr-2" />
          {isSelecting ? 'Selecting...' : 'Browse'}
        </button>
      </div>
      
      {(error || fsError) && (
        <p className="text-sm text-red-600">{error || fsError}</p>
      )}
    </div>
  );
}