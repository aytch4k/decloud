import { FolderOpen, Users, Clock, Star, Shield, HardDrive } from 'lucide-react';

export const NAVIGATION_ITEMS = [
  { name: 'My Files', icon: FolderOpen, path: '/', count: 128 },
  { name: 'Shared', icon: Users, path: '/shared', count: 12 },
  { name: 'Recent', icon: Clock, path: '/recent' },
  { name: 'Starred', icon: Star, path: '/starred', count: 5 },
  { name: 'Security', icon: Shield, path: '/security' },
  { name: 'Storage', icon: HardDrive, path: '/storage' },
];