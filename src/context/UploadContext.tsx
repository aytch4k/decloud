import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { FileMetadata, EncryptionTier } from '../types/file';
import { mockFiles } from '../data/mockFiles';
import { storageService } from '../services/storage';

interface UploadContextType {
  files: FileMetadata[];
  addFiles: (newFiles: File[], encryptionTier: EncryptionTier) => Promise<void>;
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

  const addFiles = async (newFiles: File[], encryptionTier: EncryptionTier) => {
    const uploadedFiles: FileMetadata[] = [];

    for (const file of newFiles) {
      try {
        const fileId = await storageService.uploadFile(file, {
          type: 'local',
          encryptionTier
        });

        const metadata = await storageService.getFileMetadata(fileId);
        
        const fileEntry: FileMetadata = {
          id: fileId,
          name: file.name,
          type: file.type || 'application/octet-stream',
          size: file.size.toString(),
          lastModified: new Date(file.lastModified),
          encryptionTier,
          owner: 'Current User',
          versions: [{
            id: 'v1',
            timestamp: new Date(),
            size: file.size.toString(),
            author: 'Current User',
            changes: 'Initial upload'
          }]
        };

        uploadedFiles.push(fileEntry);
      } catch (error) {
        console.error(`Failed to upload file ${file.name}:`, error);
      }
    }

    setFiles(prevFiles => [...prevFiles, ...uploadedFiles]);
  };

  const updateFileSecurity = (fileId: string, tier: EncryptionTier) => {
    setFiles(prevFiles =>
      prevFiles.map(file =>
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