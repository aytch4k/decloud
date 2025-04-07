import React from 'react';
import { Check, X, Cloud, Database, HardDrive } from 'lucide-react';
import { useStorage } from '../../../context/StorageContext';
import type { StorageEndpoint } from '../../../types/storage';

interface EndpointListProps {
  endpoints: StorageEndpoint[];
}

export function EndpointList({ endpoints }: EndpointListProps) {
  const { removeEndpoint, setDefaultEndpoint } = useStorage();

  const getEndpointIcon = (type: StorageEndpoint['type']) => {
    switch (type) {
      case 'ipfs':
        return <Cloud className="h-5 w-5 text-blue-500" />;
      case 's3':
        return <Database className="h-5 w-5 text-orange-500" />;
      default:
        return <HardDrive className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: StorageEndpoint['status']) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'active':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Active</span>;
      case 'inactive':
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Inactive</span>;
      case 'error':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Error</span>;
    }
  };

  return (
    <div className="divide-y divide-gray-200">
      {endpoints.map(endpoint => (
        <div key={endpoint.id} className="py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getEndpointIcon(endpoint.type)}
            <div>
              <h4 className="text-sm font-medium text-gray-900">{endpoint.name}</h4>
              <p className="text-sm text-gray-500">Type: {endpoint.type}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {getStatusBadge(endpoint.status)}
            
            {endpoint.isDefault ? (
              <span className="flex items-center text-sm text-green-600">
                <Check className="h-4 w-4 mr-1" />
                Default
              </span>
            ) : (
              <button
                onClick={() => setDefaultEndpoint(endpoint.id)}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Set as Default
              </button>
            )}

            <button
              onClick={() => removeEndpoint(endpoint.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              disabled={endpoint.isDefault}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}