import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import AdDetails from './pages/AdDetails'
import PostAd from './pages/PostAd'
import Saved from './pages/Saved'
import Chats from './pages/Chats'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import { AuthProvider, useAuth } from './hooks/useAuth'

function PrivateRoute({ children }: { children: JSX.Element }){
  const { user, initializing } = useAuth()
  if(initializing) return <div className="p-4">Loading...</div>
  return user ? children : <Navigate to="/login" replace />
}

export default function App(){
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/ad/:id" element={<AdDetails />} />
            <Route path="/post" element={<PrivateRoute><PostAd /></PrivateRoute>} />
            <Route path="/saved" element={<PrivateRoute><Saved /></PrivateRoute>} />
            <Route path="/chats" element={<PrivateRoute><Chats /></PrivateRoute>} />
            <Route path="/chat/:threadId" element={<PrivateRoute><Chat /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </AuthProvider>
  )
}
