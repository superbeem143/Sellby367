import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { logout } from '../lib/auth'
import { useNavigate } from 'react-router-dom'

export default function Profile(){
  const { user } = useAuth()
  const navigate = useNavigate()
  if(!user) return <div>Loading...</div>

  async function onLogout(){
    await logout()
    navigate('/')
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Profile</h2>
      <div className="mt-4">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
      </div>
      <div className="mt-4">
        <button onClick={onLogout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </div>
    </div>
  )
}
