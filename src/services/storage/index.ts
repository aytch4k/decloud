import type { StorageProvider, StorageConfig } from './types';
import { LocalStorageProvider } from './providers/local';
import { IPFSStorageProvider } from './providers/ipfs';

class StorageService {
  private provider: StorageProvider;

  constructor(providerType: 'local' | 'ipfs' = 'local') {
    this.provider = this.initializeProvider(providerType);
  }

  private initializeProvider(type: 'local' | 'ipfs'): StorageProvider {
    switch (type) {
      case 'local':
        return new LocalStorageProvider();
      case 'ipfs':
        return new IPFSStorageProvider();
      default:
        throw new Error(`Unsupported storage provider: ${type}`);
    }
  }

  async uploadFile(file: File, config: StorageConfig): Promise<string> {
    try {
      return await this.provider.upload(file, config);
    } catch (error) {
      console.error('Failed to upload file:', error);
      throw error;
    }
  }

  async downloadFile(fileId: string): Promise<Blob> {
    try {
      return await this.provider.download(fileId);
    } catch (error) {
      console.error('Failed to download file:', error);
      throw error;
    }
  }

  async deleteFile(fileId: string): Promise<void> {
    try {
      await this.provider.delete(fileId);
    } catch (error) {
      console.error('Failed to delete file:', error);
      throw error;
    }
  }

  async getFileMetadata(fileId: string) {
    try {
      return await this.provider.getMetadata(fileId);
    } catch (error) {
      console.error('Failed to get file metadata:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const storageService = new StorageService('local');