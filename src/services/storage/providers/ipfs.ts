import type { StorageProvider, StorageConfig, FileMetadata } from '../types';

export class IPFSStorageProvider implements StorageProvider {
  async upload(file: File, config: StorageConfig): Promise<string> {
    // In a real implementation, this would:
    // 1. Connect to IPFS node
    // 2. Upload file to IPFS
    // 3. Return the IPFS hash
    throw new Error('IPFS storage not implemented');
  }

  async download(fileId: string): Promise<Blob> {
    // In a real implementation, this would:
    // 1. Connect to IPFS node
    // 2. Retrieve file from IPFS using hash
    // 3. Return the file data
    throw new Error('IPFS storage not implemented');
  }

  async delete(fileId: string): Promise<void> {
    // Note: Files on IPFS cannot be truly deleted
    // This would typically just remove the reference from our system
    throw new Error('IPFS storage not implemented');
  }

  async getMetadata(fileId: string): Promise<FileMetadata> {
    throw new Error('IPFS storage not implemented');
  }
}