import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { Provider as ReduxProvider } from "react-redux"
import { router } from './routes/index.tsx'
import { ThemeProvider } from './providers/theme-provider.tsx'
import { store } from './redux/store.ts'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router}></RouterProvider>
        <Toaster richColors></Toaster>
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>,
)
