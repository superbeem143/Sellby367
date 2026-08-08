import React, { useState } from 'react'
import { sendReset } from '../lib/auth'

export default function ForgotPassword(){
  const [email,setEmail] = useState('')
  async function submit(e:React.FormEvent){
    e.preventDefault()
    try{
      await sendReset(email)
      alert('Password reset email sent')
    }catch(e){ alert('Failed to send reset') }
  }
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Reset password</h2>
      <form onSubmit={submit} className="mt-4">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Send reset</button>
      </form>
    </div>
  )
}
