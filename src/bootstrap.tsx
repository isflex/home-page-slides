import React from 'react'
import { createRoot } from 'react-dom/client'
const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container) if not using TypeScript
import App from './App'

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
