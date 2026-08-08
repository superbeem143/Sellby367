import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Header(){
  const { user } = useAuth()
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center text-white font-bold">S</div>
          <div className="text-lg font-semibold">SELLBY</div>
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <Link to="/profile" className="text-sm">{user.name}</Link>
          ) : (
            <Link to="/login" className="text-sm">Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}
