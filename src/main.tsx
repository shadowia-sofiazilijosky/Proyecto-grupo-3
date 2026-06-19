import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './global.css'; 
import { AppProviders } from "@/app/providers";
import { RouterProvider } from 'react-router';
import { router } from "@/app/router";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
)