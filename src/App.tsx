import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppRoutes } from './routes';
import { UploadProvider } from './context/UploadContext';
import { SidebarProvider } from './context/SidebarContext';
import { NavigationProvider } from './context/NavigationContext';
import { StorageProvider } from './context/StorageContext';

export default function App() {
  return (
    <Router>
      <StorageProvider>
        <SidebarProvider>
          <NavigationProvider>
            <UploadProvider>
              <Layout>
                <AppRoutes />
              </Layout>
            </UploadProvider>
          </NavigationProvider>
        </SidebarProvider>
      </StorageProvider>
    </Router>
  );
}