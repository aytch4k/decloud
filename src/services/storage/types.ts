import type { EncryptionTier } from '../../types/file';

export interface StorageConfig {
  type: 'local' | 'ipfs' | 's3';
  encryptionTier: EncryptionTier;
}

export interface StorageProvider {
  upload: (file: File, config: StorageConfig) => Promise<string>;
  download: (fileId: string) => Promise<Blob>;
  delete: (fileId: string) => Promise<void>;
  getMetadata: (fileId: string) => Promise<FileMetadata>;
}

export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: Date;
  uri: string;
}