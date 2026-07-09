import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'
import { RecordBooth } from './components/RecordBooth.tsx'

const isRecordRoute = window.location.pathname.replace(/\/+$/, '') === '/record'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isRecordRoute ? <RecordBooth /> : <App />}
    <Analytics />
  </StrictMode>,
)
