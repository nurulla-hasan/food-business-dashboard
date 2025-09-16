import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/router.jsx'
import { ThemeProvider } from './theme/theme-provider'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme='light' storageKey='theme'>
          <RouterProvider router={router} />
          <Toaster richColors position="bottom-right" />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
