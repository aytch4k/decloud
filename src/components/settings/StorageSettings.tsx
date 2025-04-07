import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useStorage } from '../../context/StorageContext';
import { EndpointList } from './storage/EndpointList';
import { AddEndpointModal } from './storage/AddEndpointModal';

export function StorageSettings() {
  const { endpoints } = useStorage();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Storage Settings</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Storage
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Storage Endpoints</h3>
          <EndpointList endpoints={endpoints} />
        </div>
      </div>

      {showAddModal && (
        <AddEndpointModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}