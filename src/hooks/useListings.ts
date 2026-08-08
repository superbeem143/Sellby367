import { useEffect, useState } from 'react'
import { onLatestListings, searchListings, getListingsByCategory } from '../lib/listings'
import { Listing } from '../types/sellby'

export function useListings(){
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const unsub = onLatestListings(items=>{
      setListings(items)
      setLoading(false)
    })
    return ()=>unsub()
  },[])

  async function search(term:string){
    setLoading(true)
    const res = await searchListings(term)
    setListings(res)
    setLoading(false)
  }

  async function byCategory(catId:string){
    setLoading(true)
    const res = await getListingsByCategory(catId)
    setListings(res)
    setLoading(false)
  }

  return { listings, loading, search, byCategory }
}
