import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Overview from './pages/Overview.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import NotFound from './pages/NotFound.jsx'
import StudentDetails from './pages/StudentDetails.jsx'
import EventDetails from './pages/EventDetails.jsx'
import './App.css'

const loadStoredValue = (key, fallback) => {
  if (typeof window === 'undefined') return fallback

  try {
    const savedValue = window.localStorage.getItem(key)
    if (savedValue === null) return fallback
    return JSON.parse(savedValue)
  } catch {
    return fallback
  }
}

export default function App() {
  const [students, setStudents] = useState(() => loadStoredValue('students', []))
  const [currentUser, setCurrentUser] = useState(() => loadStoredValue('currentUser', null))
  const [isAuthenticated, setIsAuthenticated] = useState(() => loadStoredValue('isAuthenticated', false))

  useEffect(() => {
    window.localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  useEffect(() => {
    window.localStorage.setItem('currentUser', JSON.stringify(currentUser))
  }, [currentUser])

  useEffect(() => {
    window.localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated))
  }, [isAuthenticated])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="register" element={<Register setStudents={setStudents} />} />

        <Route
          path="login"
          element={
            <Login
              students={students}
              setCurrentUser={setCurrentUser}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />

        <Route path="details/:id" element={<EventDetails />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard
                setCurrentUser={setCurrentUser}
                setIsAuthenticated={setIsAuthenticated}
              />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview students={students} />} />
          <Route path="overview" element={<Overview students={students} />} />
          <Route path="profile" element={<Profile currentUser={currentUser} />} />
          <Route path="settings" element={<Settings />} />
          <Route path="student/:id" element={<StudentDetails students={students} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}