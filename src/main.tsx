import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'
import { RecordBooth } from './components/RecordBooth.tsx'
import { LanguageProvider } from './i18n/LanguageContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/record" element={<RecordBooth />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
    <Analytics />
  </StrictMode>,
)