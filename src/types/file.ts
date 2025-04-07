export interface FileMetadata {
  id: string;
  name: string;
  type: string;
  size: string;
  items?: string;
  lastModified: Date;
  versions?: Version[];
  encryptionTier: EncryptionTier;
  shared?: boolean;
  owner: string;
}

export interface Version {
  id: string;
  timestamp: Date;
  size: string;
  author: string;
  changes: string;
}

export type EncryptionTier = 'none' | 'basic' | 'advanced' | 'enterprise' | 'quantum';