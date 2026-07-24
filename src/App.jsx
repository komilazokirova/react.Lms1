import React from 'react'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/dashboard/Dashboard'
import Courses from './pages/dashboard/Courses'
import CoursesDetails from './pages/dashboard/CoursesDetails'
import MyLearning from './pages/dashboard/MyLearning'
import Settings from './pages/dashboard/Settings'
import Profile from './pages/dashboard/Profile'
import ProtectedRoute from './components/ProtectedRoute'

import UsersPage from './pages/dashboard/UsersPage'


const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CoursesDetails />} />
          <Route path="my-learning" element={<MyLearning />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path ="users" element={<UsersPage/>}/>
        </Route>
        <Route path ="*" element={<p>Not Found 404</p>}/>
      </Routes>
    </div>
  )
}

export default App