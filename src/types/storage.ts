export interface StorageEndpoint {
  id: string;
  name: string;
  type: 'local' | 'ipfs' | 's3';
  config: {
    path?: string;      // For local storage
    url?: string;       // For IPFS/S3
    apiKey?: string;    // For IPFS/S3
    gateway?: string;   // For IPFS
    region?: string;    // For S3
    bucket?: string;    // For S3
  };
  isDefault: boolean;
  status: 'active' | 'inactive' | 'error';
}

export interface StorageSettings {
  endpoints: StorageEndpoint[];
  defaultEndpoint: string;
}

export interface StorageHistory {
  date: string;
  used: number;
  total: number;
}

export interface StorageBreakdown {
  [key: string]: number;
}

export interface StorageQuota {
  total: number;
  used: number;
  available: number;
}