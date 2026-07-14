import { useState } from 'react'
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
import './App.css'

export default function App() {
  const [students, setStudents] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        
        <Route
          path="register"
          element={<Register setStudents={setStudents} />}
        />

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

        <Route
          path="dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview students={students} />} />
          <Route path="overview" element={<Overview students={students} />} />
          <Route
            path="profile"
            element={<Profile currentUser={currentUser} />}
          />
          <Route path="settings" element={<Settings />} />
          <Route
            path="student/:id"
            element={<StudentDetails students={students} />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}