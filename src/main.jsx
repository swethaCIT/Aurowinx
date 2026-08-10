import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Sitewide prefers-reduced-motion support: framer-motion neutralizes
        transform-based animations (x/y/scale/rotate) for every motion.*
        component automatically, without threading a check through each
        one individually. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
