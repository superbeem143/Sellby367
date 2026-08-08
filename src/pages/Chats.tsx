import React, { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

export default function Chats(){
  const { user } = useAuth()
  const [threads, setThreads] = useState<any[]>([])

  useEffect(()=>{
    if(!user) return
    const q = query(collection(db,'chatThreads'), where('buyerId','==',user.id))
    const unsub = onSnapshot(q, snap=> setThreads(snap.docs.map(d=> ({ id:d.id, ...(d.data() as any)}))))
    return ()=>unsub()
  },[user])

  return (
    <div>
      <h2 className="text-xl font-semibold">Chats</h2>
      <div className="mt-4">
        {threads.map(t=> (
          <Link key={t.id} to={`/chat/${t.id}`} className="block p-3 border rounded mb-2">{t.lastMessage || 'Conversation'}</Link>
        ))}
      </div>
    </div>
  )
}
