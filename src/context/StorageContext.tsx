import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { StorageEndpoint } from '../types/storage';

interface StorageContextType {
  endpoints: StorageEndpoint[];
  addEndpoint: (endpoint: Omit<StorageEndpoint, 'id'>) => void;
  removeEndpoint: (id: string) => void;
  updateEndpoint: (id: string, updates: Partial<StorageEndpoint>) => void;
  setDefaultEndpoint: (id: string) => void;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

const DEFAULT_ENDPOINTS: StorageEndpoint[] = [
  {
    id: 'local-1',
    name: 'Local Storage',
    type: 'local',
    config: {},
    isDefault: true,
    status: 'active'
  }
];

export function StorageProvider({ children }: { children: ReactNode }) {
  const [endpoints, setEndpoints] = useState<StorageEndpoint[]>(DEFAULT_ENDPOINTS);

  const addEndpoint = (endpoint: Omit<StorageEndpoint, 'id'>) => {
    const newEndpoint: StorageEndpoint = {
      ...endpoint,
      id: `${endpoint.type}-${Date.now()}`
    };
    setEndpoints(prev => [...prev, newEndpoint]);
  };

  const removeEndpoint = (id: string) => {
    setEndpoints(prev => prev.filter(ep => ep.id !== id));
  };

  const updateEndpoint = (id: string, updates: Partial<StorageEndpoint>) => {
    setEndpoints(prev => prev.map(ep => 
      ep.id === id ? { ...ep, ...updates } : ep
    ));
  };

  const setDefaultEndpoint = (id: string) => {
    setEndpoints(prev => prev.map(ep => ({
      ...ep,
      isDefault: ep.id === id
    })));
  };

  return (
    <StorageContext.Provider value={{
      endpoints,
      addEndpoint,
      removeEndpoint,
      updateEndpoint,
      setDefaultEndpoint
    }}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
}