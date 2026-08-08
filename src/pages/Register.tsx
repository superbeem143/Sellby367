import React, { useState } from 'react'
import { registerWithEmail } from '../lib/auth'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  async function submit(e:React.FormEvent){
    e.preventDefault()
    try{
      await registerWithEmail(name,email,password)
      navigate('/')
    }catch(e){ console.error(e); alert('Register failed') }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Register</h2>
      <form onSubmit={submit} className="mt-4 space-y-2">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full p-2 border rounded" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  )
}
