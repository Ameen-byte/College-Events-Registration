import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Overview from './pages/Overview.jsx'
import Events from './pages/Events.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import NotFound from './pages/NotFound.jsx'
import StudentDetails from './pages/StudentDetails.jsx'
import EventDetails from './pages/EventDetails.jsx'
import { setAuthToken } from './api/api.js'
import './App.css'

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleAuth = (user, token) => {
    setAuthToken(token)
    setCurrentUser(user)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setAuthToken('')
    setCurrentUser(null)
    setIsAuthenticated(false)
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="register" element={<Register onAuthenticated={handleAuth} />} />

        <Route
          path="login"
          element={
            <Login
              onAuthenticated={handleAuth}
            />
          }
        />

        <Route path="details/:id" element={<EventDetails />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview currentUser={currentUser} />} />
          <Route path="overview" element={<Overview currentUser={currentUser} />} />
          <Route path="events" element={<Events currentUser={currentUser} />} />
          <Route path="profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="settings" element={<Settings />} />
          <Route path="student/:id" element={<StudentDetails />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}