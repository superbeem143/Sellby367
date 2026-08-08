import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { subscribeThreadMessages, sendMessage } from '../lib/chat'
import ChatMessage from '../components/ChatMessage'
import { useAuth } from '../hooks/useAuth'

export default function Chat(){
  const { threadId } = useParams()
  const [messages, setMessages] = useState<any[]>([])
  const [text, setText] = useState('')
  const { user } = useAuth()
  const ref = useRef<HTMLDivElement|null>(null)

  useEffect(()=>{
    if(!threadId) return
    const unsub = subscribeThreadMessages(threadId, setMessages)
    return ()=>unsub()
  },[threadId])

  useEffect(()=>{ ref.current?.scrollTo({ top: ref.current.scrollHeight }) },[messages])

  async function onSend(){
    if(!threadId || !user) return
    if(!text.trim()) return
    await sendMessage(threadId, { senderId: user.id, text, imageUrl: '' })
    setText('')
  }

  return (
    <div className="flex flex-col h-[60vh]">
      <div ref={ref} className="flex-1 overflow-auto p-2">
        {messages.map(m=> <ChatMessage key={m.id} message={m} />)}
      </div>
      <div className="mt-2 flex">
        <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Type a message" />
        <button onClick={onSend} className="ml-2 bg-blue-600 text-white px-4 rounded">Send</button>
      </div>
    </div>
  )
}
