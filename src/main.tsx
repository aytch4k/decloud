import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SidebarProvider } from './context/SidebarContext';
import { UploadProvider } from './context/UploadContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarProvider>
      <UploadProvider>
        <App />
      </UploadProvider>
    </SidebarProvider>
  </StrictMode>
);