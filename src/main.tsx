import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RoutePages } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoutePages/>
  </StrictMode>
)
