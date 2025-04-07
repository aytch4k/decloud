import type { FileMetadata } from '../types/file';

export const mockFiles: FileMetadata[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    size: '-',
    items: '24 files',
    lastModified: new Date(),
    owner: 'Current User',
    encryptionTier: 'basic'
  },
  {
    id: '2',
    name: 'Images',
    type: 'folder',
    size: '-',
    items: '12 files',
    lastModified: new Date(),
    owner: 'Current User',
    encryptionTier: 'advanced'
  },
  {
    id: '3',
    name: 'Project Proposal.pdf',
    type: 'pdf',
    size: '2.4 MB',
    lastModified: new Date(),
    owner: 'Current User',
    encryptionTier: 'enterprise',
    versions: [
      {
        id: 'v1',
        timestamp: new Date(Date.now() - 86400000),
        size: '2.3 MB',
        author: 'John Doe',
        changes: 'Updated executive summary'
      },
      {
        id: 'v2',
        timestamp: new Date(Date.now() - 172800000),
        size: '2.2 MB',
        author: 'Jane Smith',
        changes: 'Initial draft'
      }
    ]
  }
];