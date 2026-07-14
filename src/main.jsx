import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom'
=======
>>>>>>> 3c0d9399f623008b350110f82fcc13138a690300
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< HEAD
    <BrowserRouter>
      <App />
    </BrowserRouter>
=======
    <App />
>>>>>>> 3c0d9399f623008b350110f82fcc13138a690300
  </StrictMode>,
)
