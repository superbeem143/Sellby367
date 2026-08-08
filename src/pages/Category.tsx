import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CATEGORIES } from '../lib/sellby-data'
import ListingCard from '../components/ListingCard'
import { useListings } from '../hooks/useListings'

export default function Category(){
  const { id } = useParams()
  const { listings, loading, byCategory } = useListings()

  useEffect(()=>{ if(id) byCategory(id) },[id])

  const cat = CATEGORIES.find(c=>c.id===id)

  return (
    <div>
      <h2 className="text-xl font-semibold">{cat?.name}</h2>
      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {listings.map(l=> <ListingCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  )
}
