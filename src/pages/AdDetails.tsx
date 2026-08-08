import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getListing } from '../lib/listings'
import ImageGallery from '../components/ImageGallery'
import { useAuth } from '../hooks/useAuth'
import { openOrGetThread } from '../lib/chat'

export default function AdDetails(){
  const { id } = useParams()
  const [listing, setListing] = useState<any>(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    if(!id) return
    getListing(id).then(setListing)
  },[id])

  if(!listing) return <div>Loading...</div>

  async function startChat(){
    if(!user) return navigate('/login')
    if(user.id === listing.sellerId) return
    const threadId = await openOrGetThread(listing.id, user.id, listing.sellerId)
    navigate(`/chat/${threadId}`)
  }

  return (
    <div>
      <ImageGallery images={listing.images || []} />
      <div className="mt-4">
        <h1 className="text-2xl font-bold">{listing.title}</h1>
        <div className="text-lg text-blue-600">${listing.price}</div>
        <div className="text-sm text-gray-600">{listing.location}</div>
        <p className="mt-4">{listing.description}</p>
        <div className="mt-4 flex space-x-2">
          <button onClick={startChat} className="bg-blue-600 text-white px-4 py-2 rounded">Chat</button>
        </div>
      </div>
    </div>
  )
}
