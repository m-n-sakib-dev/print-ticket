import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PrintPage from './PrintPage.jsx'

const isPrintPage = new URLSearchParams(location.search).has('print')

createRoot(document.getElementById('root')).render(
  <StrictMode>{isPrintPage ? <PrintPage /> : <App />}</StrictMode>,
)
