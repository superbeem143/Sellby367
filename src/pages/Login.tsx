import React, { useState } from 'react'
import { loginWithEmail } from '../lib/auth'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  async function submit(e:React.FormEvent){
    e.preventDefault()
    try{
      await loginWithEmail(email,password)
      navigate('/')
    }catch(e){ alert('Login failed') }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Login</h2>
      <form onSubmit={submit} className="mt-4 space-y-2">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
      <div className="mt-2">
        <Link to="/forgot-password" className="text-sm">Forgot password?</Link>
      </div>
      <div className="mt-2">
        <Link to="/register" className="text-sm">Create an account</Link>
      </div>
    </div>
  )
}
