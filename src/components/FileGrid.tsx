import React from 'react';
import { useUpload } from '../context/UploadContext';
import { FileList } from './files/FileList';
import { FileHeader } from './files/FileHeader';
import { UploadModal } from './upload/UploadModal';

export function FileGrid() {
  const { isUploadModalOpen, setUploadModalOpen } = useUpload();

  return (
    <div className="space-y-6">
      <FileHeader onUpload={() => setUploadModalOpen(true)} />
      <FileList />
      {isUploadModalOpen && <UploadModal />}
    </div>
  );
}