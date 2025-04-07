import React, { useState } from 'react';
import { useStorage } from '../../../context/StorageContext';
import { ModalHeader } from '../../common/ModalHeader';
import { ModalFooter } from '../../common/ModalFooter';
import { FolderInput } from './FolderInput';
import type { StorageEndpoint } from '../../../types/storage';

interface AddEndpointModalProps {
  onClose: () => void;
}

const STORAGE_TYPES = [
  { value: 'local', label: 'Local Storage' },
  { value: 'ipfs', label: 'IPFS' },
  { value: 's3', label: 'S3 Compatible' }
] as const;

export function AddEndpointModal({ onClose }: AddEndpointModalProps) {
  const { addEndpoint } = useStorage();
  const [formData, setFormData] = useState({
    name: '',
    type: 'local' as StorageEndpoint['type'],
    config: {
      path: ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // For local storage, verify the path exists and is writable
      if (formData.type === 'local' && formData.config.path) {
        // In a real app, we would verify the path here
        // For now, we'll just simulate a delay
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      addEndpoint({
        ...formData,
        isDefault: false,
        status: 'active'
      });
      
      onClose();
    } catch (error) {
      console.error('Failed to add endpoint:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderConfigFields = () => {
    switch (formData.type) {
      case 'local':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Storage Location
              </label>
              <FolderInput
                value={formData.config.path || ''}
                onChange={path => setFormData(prev => ({
                  ...prev,
                  config: { ...prev.config, path }
                }))}
                placeholder="Select a folder for local storage"
              />
            </div>
          </div>
        );

      case 'ipfs':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                IPFS Gateway URL
              </label>
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="https://ipfs.example.com"
                value={formData.config.gateway || ''}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  config: { ...prev.config, gateway: e.target.value }
                }))}
              />
            </div>
          </div>
        );

      case 's3':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                S3 Endpoint URL
              </label>
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="https://s3.amazonaws.com"
                value={formData.config.url || ''}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  config: { ...prev.config, url: e.target.value }
                }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Region
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="us-east-1"
                  value={formData.config.region || ''}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    config: { ...prev.config, region: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bucket Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="my-bucket"
                  value={formData.config.bucket || ''}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    config: { ...prev.config, bucket: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl my-8">
        <ModalHeader title="Add Storage Endpoint" onClose={onClose} />
        
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="My Storage"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Storage Type
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.type}
                onChange={e => setFormData(prev => ({ 
                  ...prev, 
                  type: e.target.value as StorageEndpoint['type'],
                  config: {} // Reset config when type changes
                }))}
              >
                {STORAGE_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {renderConfigFields()}
          </div>
        </div>

        <ModalFooter
          onCancel={onClose}
          onConfirm={handleSubmit}
          confirmText={isSubmitting ? 'Adding...' : 'Add Endpoint'}
          disabled={!formData.name || isSubmitting}
        />
      </div>
    </div>
  );
}