import React from 'react'
import { Message } from '../types/sellby'
import { useAuth } from '../hooks/useAuth'

export default function ChatMessage({message}:{message:Message}){
  const { user } = useAuth()
  const mine = user && user.id === message.senderId
  return (
    <div className={"p-2 my-1 max-w-xs " + (mine ? 'ml-auto text-right' : 'mr-auto text-left')}>
      <div className={"inline-block p-2 rounded " + (mine ? 'bg-blue-600 text-white' : 'bg-gray-200')}>{message.text}</div>
    </div>
  )
}
