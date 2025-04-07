import { useState, useEffect } from 'react';
import type { StorageHistory, StorageBreakdown } from '../types/storage';

export function useStorage() {
  const [totalSpace] = useState(20 * 1024 * 1024 * 1024); // 20GB
  const [usedSpace] = useState(15 * 1024 * 1024 * 1024); // 15GB
  const [breakdown] = useState<StorageBreakdown>({
    'Documents': 5 * 1024 * 1024 * 1024,
    'Images': 4 * 1024 * 1024 * 1024,
    'Videos': 3 * 1024 * 1024 * 1024,
    'Others': 3 * 1024 * 1024 * 1024,
  });
  const [storageHistory] = useState<StorageHistory[]>([
    { date: '2024-01-01', used: 10 * 1024 * 1024 * 1024, total: totalSpace },
    { date: '2024-02-01', used: 12 * 1024 * 1024 * 1024, total: totalSpace },
    { date: '2024-03-01', used: 15 * 1024 * 1024 * 1024, total: totalSpace },
  ]);

  return {
    totalSpace,
    usedSpace,
    breakdown,
    storageHistory,
  };
}