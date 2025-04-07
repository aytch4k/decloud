import React, { useState, useCallback } from 'react';
import { useUpload } from '../../context/UploadContext';
import { UploadDropzone } from './UploadDropzone';
import { UploadFileList } from './UploadFileList';
import { EncryptionSelector } from './EncryptionSelector';
import { ModalHeader } from '../common/ModalHeader';
import { ModalFooter } from '../common/ModalFooter';
import type { EncryptionTier } from '../../types/file';

export function UploadModal() {
  const { setUploadModalOpen, addFiles } = useUpload();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [encryptionTier, setEncryptionTier] = useState<EncryptionTier>('basic');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = useCallback((files: File[]) => {
    setSelectedFiles(files);
  }, []);

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    try {
      await addFiles(selectedFiles, encryptionTier);
      setUploadModalOpen(false);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl my-8 relative">
        <ModalHeader title="Upload Files" onClose={() => setUploadModalOpen(false)} />
        
        <div className="p-6 space-y-6">
          <UploadDropzone onFileSelect={handleFileSelect} />
          
          {selectedFiles.length > 0 && (
            <UploadFileList files={selectedFiles} />
          )}

          <EncryptionSelector
            selected={encryptionTier}
            onChange={setEncryptionTier}
          />
        </div>

        <ModalFooter
          onCancel={() => setUploadModalOpen(false)}
          onConfirm={handleUpload}
          confirmText={isUploading ? 'Uploading...' : 'Upload'}
          isLoading={isUploading}
          disabled={selectedFiles.length === 0}
        />
      </div>
    </div>
  );
}