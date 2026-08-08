import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function BottomNav(){
  const { user } = useAuth()
  return (
    <nav className="bg-white border-t py-2 fixed bottom-0 left-0 right-0">
      <div className="container mx-auto flex justify-around">
        <Link to="/" className="text-center">Home</Link>
        <Link to="/post" className="text-center">Add Ad</Link>
        <Link to="/chats" className="text-center">Chats</Link>
        <Link to="/saved" className="text-center">Saved</Link>
      </div>
    </nav>
  )
}
