import React, { useState } from 'react'
import { CATEGORIES } from '../lib/sellby-data'
import { uploadImage } from '../lib/storage'
import { createListing } from '../lib/listings'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function PostAd(){
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState<number>(0)
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  async function publish(){
    if(!user) return
    if(!category || !title || !price) return alert('Please fill required fields')
    setUploading(true)
    try{
      const urls: string[] = []
      for(const f of images){
        const u = await uploadImage(f)
        urls.push(u)
      }
      const listing = await createListing({ category, title, price, location, description, images: urls, sellerId: user.id, metadata: {}, status: 'active' })
      navigate(`/ad/${listing.id}`)
    }catch(e){
      console.error(e)
      alert('Failed to publish')
    }finally{ setUploading(false) }
  }

  function onFiles(e:React.ChangeEvent<HTMLInputElement>){
    if(!e.target.files) return
    setImages(Array.from(e.target.files))
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Post Ad</h2>
      <div className="mb-2">
        <label className="block">Category</label>
        <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full p-2 border rounded">
          <option value="">Select</option>
          {CATEGORIES.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="mb-2">
        <label className="block">Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-2">
        <label className="block">Price</label>
        <input type="number" value={price} onChange={e=>setPrice(Number(e.target.value))} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-2">
        <label className="block">Location</label>
        <input value={location} onChange={e=>setLocation(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-2">
        <label className="block">Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-2">
        <label className="block">Images</label>
        <input type="file" multiple accept="image/*" onChange={onFiles} />
        <div className="flex space-x-2 mt-2">
          {images.map((f,i)=> <div key={i} className="w-20 h-20 bg-gray-100 flex items-center justify-center text-xs">{f.name}</div>)}
        </div>
      </div>

      <div className="mt-4">
        <button onClick={publish} className="bg-blue-600 text-white px-4 py-2 rounded" disabled={uploading}>{uploading ? 'Publishing...' : 'Publish'}</button>
      </div>
    </div>
  )
}
