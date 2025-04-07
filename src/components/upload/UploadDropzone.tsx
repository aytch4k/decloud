import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface UploadDropzoneProps {
  onFileSelect: (files: File[]) => void;
}

export function UploadDropzone({ onFileSelect }: UploadDropzoneProps) {
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    onFileSelect(files);
  }, [onFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleFileInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onFileSelect(files);
  }, [onFileSelect]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-300 transition-colors"
    >
      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <p className="text-gray-600 mb-2">Drag and drop files here or</p>
      <label className="inline-block">
        <span className="bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-700 transition-colors">
          Browse Files
        </span>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInput}
        />
      </label>
    </div>
  );
}