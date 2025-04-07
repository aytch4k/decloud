import type { StorageProvider, StorageConfig, FileMetadata } from '../types';

export class LocalStorageProvider implements StorageProvider {
  private storage: Map<string, { data: Blob; metadata: FileMetadata }> = new Map();
  private basePath: string | null = null;

  setBasePath(path: string) {
    this.basePath = path;
  }

  async upload(file: File, config: StorageConfig): Promise<string> {
    if (!this.basePath) {
      throw new Error('Storage location not configured');
    }

    const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // In a web container environment, we'll store files in memory
      // In a real app, this would write to the actual file system
      const metadata: FileMetadata = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: new Date(file.lastModified),
        uri: `${this.basePath}/${fileId}-${file.name}`
      };

      this.storage.set(fileId, {
        data: file,
        metadata
      });

      return fileId;
    } catch (error) {
      console.error('Failed to save file:', error);
      throw new Error('Failed to save file to storage');
    }
  }

  async download(fileId: string): Promise<Blob> {
    const entry = this.storage.get(fileId);
    if (!entry) {
      throw new Error('File not found');
    }
    return entry.data;
  }

  async delete(fileId: string): Promise<void> {
    this.storage.delete(fileId);
  }

  async getMetadata(fileId: string): Promise<FileMetadata> {
    const entry = this.storage.get(fileId);
    if (!entry) {
      throw new Error('File not found');
    }
    return entry.metadata;
  }
}