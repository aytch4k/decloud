import { useState, useCallback } from 'react';

interface FileSystemAccessHook {
  selectDirectory: () => Promise<string>;
  selectedPath: string | null;
  error: string | null;
  isSelecting: boolean;
}

export function useFileSystemAccess(): FileSystemAccessHook {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const selectDirectory = useCallback(async (): Promise<string> => {
    setError(null);
    setIsSelecting(true);

    try {
      // Create a temporary input element
      const input = document.createElement('input');
      input.type = 'file';
      input.webkitdirectory = true;
      input.directory = true;

      return new Promise((resolve, reject) => {
        input.onchange = () => {
          const files = Array.from(input.files || []);
          if (files.length > 0) {
            // Get the common parent directory
            const path = files[0].webkitRelativePath.split('/')[0];
            setSelectedPath(path);
            resolve(path);
          } else {
            reject(new Error('No folder selected'));
          }
        };

        input.onerror = () => {
          reject(new Error('Failed to select folder'));
        };

        // Trigger the file picker
        input.click();
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to select folder';
      setError(message);
      throw err;
    } finally {
      setIsSelecting(false);
    }
  }, []);

  return {
    selectDirectory,
    selectedPath,
    error,
    isSelecting
  };
}