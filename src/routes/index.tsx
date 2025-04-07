import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FileGrid } from '../components/FileGrid';
import { StorageView } from '../components/storage/StorageView';
import { SharedView } from '../views/SharedView';
import { RecentView } from '../views/RecentView';
import { StarredView } from '../views/StarredView';
import { SecurityView } from '../views/SecurityView';
import { StorageSettings } from '../components/settings/StorageSettings';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FileGrid />} />
      <Route path="/shared" element={<SharedView />} />
      <Route path="/recent" element={<RecentView />} />
      <Route path="/starred" element={<StarredView />} />
      <Route path="/security" element={<SecurityView />} />
      <Route path="/storage" element={<StorageView />} />
      <Route path="/settings" element={<StorageSettings />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}