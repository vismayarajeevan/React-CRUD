import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// import browserouter 
import { BrowserRouter } from 'react-router-dom'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* write app inside browserRouter */}
    <BrowserRouter>
          <App />
    </BrowserRouter>
   
  </StrictMode>,
)
