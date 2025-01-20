import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.jsx'
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <StrictMode>
      <RouterProvider router={router} />
      <Toaster />
    </StrictMode>
  </UserProvider>
)
