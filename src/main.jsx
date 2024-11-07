import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import ChapterOne from './ChapterOne.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChapterOne />
  </StrictMode>,
)
