import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { printBootBanner } from './bootBanner.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Greet anyone who opens the dev console. Runs client-side, and is gated behind
// `import.meta.env.DEV` so it only prints on the local dev server, never in a
// production build.
import.meta.env.DEV && printBootBanner()
