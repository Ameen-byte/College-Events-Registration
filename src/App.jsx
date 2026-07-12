import { useState } from 'react'
import Home from './pages/Home'
import Registration from './pages/Registration'
import './App.css'

function App() {
  const [view, setView] = useState('home')

  return view === 'register' ? (
    <Registration onBack={() => setView('home')} />
  ) : (
    <Home onRegister={() => setView('register')} />
  )
}

export default App
