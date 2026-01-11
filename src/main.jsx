import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import Router from './Router/Router.jsx'
import AuthProvider from './Provider/AuthProvider/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeProvider from './Provider/ThemeProvider/ThemeProvider.jsx'


const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterProvider router={Router}></RouterProvider>
    </AuthProvider>
    </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
)
