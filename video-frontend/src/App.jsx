import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
import VideoList from './pages/VideoList'
import VideoUpload from './pages/VideoUpload'
import EditVideo from './pages/EditVideo'

export default function App() {
  return (
    <div>
      <NavBar />

      <div className="container">
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<VideoUpload />} />
          <Route path="/edit/:id" element={<EditVideo />} />
        </Routes>
      </div>
    </div>
  )
}
