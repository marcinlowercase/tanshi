import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../css/index.css'
// import App from './App.jsx'
import ChapterOneBackup from './ChapterOne-backup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChapterOneBackup />
  </StrictMode>,
)
