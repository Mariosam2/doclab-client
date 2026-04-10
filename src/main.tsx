import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Toast } from '@heroui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient.ts';
import router from './router.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toast.Provider placement="top end" className="z-9999" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
