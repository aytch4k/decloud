import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { FileMetadata, EncryptionTier } from '../types/file';
import { mockFiles } from '../data/mockFiles';

interface UploadContextType {
  files: FileMetadata[];
  addFiles: (newFiles: File[], encryptionTier: EncryptionTier) => void;
  updateFileSecurity: (fileId: string, tier: EncryptionTier) => void;
  selectedFile: FileMetadata | null;
  setSelectedFile: (file: FileMetadata | null) => void;
  isUploadModalOpen: boolean;
  setUploadModalOpen: (isOpen: boolean) => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<FileMetadata[]>(mockFiles);
  const [selectedFile, setSelectedFile] = useState<FileMetadata | null>(null);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);

  const addFiles = (newFiles: File[], encryptionTier: EncryptionTier) => {
    const newFileEntries: FileMetadata[] = newFiles.map((file) => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size,
      lastModified: new Date(file.lastModified),
      encryptionTier,
      owner: 'Current User',
      versions: [{
        id: 'v1',
        timestamp: new Date(),
        size: file.size,
        author: 'Current User',
        changes: 'Initial upload'
      }]
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFileEntries]);
  };

  const updateFileSecurity = (fileId: string, tier: EncryptionTier) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === fileId
          ? { ...file, encryptionTier: tier }
          : file
      )
    );
  };

  return (
    <UploadContext.Provider
      value={{
        files,
        addFiles,
        updateFileSecurity,
        selectedFile,
        setSelectedFile,
        isUploadModalOpen,
        setUploadModalOpen,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
}