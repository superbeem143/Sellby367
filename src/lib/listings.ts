import { collection, addDoc, doc, getDoc, getDocs, query, orderBy, where, serverTimestamp, updateDoc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import { Listing } from '../types/sellby'

const listingsCol = collection(db, 'listings')

type CreateListingInput = {
  category: string
  title: string
  price: number
  location: string
  description: string
  images: string[]
  sellerId: string
  metadata?: Record<string, any>
  status?: 'active'|'sold'|'removed'
}

export async function createListing(listing: CreateListingInput){
  const docRef = await addDoc(listingsCol, {
    category: listing.category,
    title: listing.title,
    price: listing.price,
    location: listing.location,
    description: listing.description,
    images: listing.images || [],
    sellerId: listing.sellerId,
    metadata: listing.metadata || {},
    status: listing.status || 'active',
    createdAt: serverTimestamp(),
  })
  const snap = await getDoc(docRef)
  return { id: docRef.id, ...(snap.data() as any) }
}

export async function getListing(id:string){
  const snap = await getDoc(doc(db,'listings',id))
  return snap.exists() ? { id: snap.id, ...(snap.data() as any)} : null
}

export async function searchListings(term:string){
  const snaps = await getDocs(query(listingsCol, orderBy('createdAt','desc')))
  const items = snaps.docs.map(d=> ({id:d.id, ...(d.data() as any)})) as Listing[]
  if(!term) return items
  const t = term.toLowerCase()
  return items.filter(i=>
    (i.title || '').toLowerCase().includes(t) ||
    (i.location || '').toLowerCase().includes(t) ||
    (i.description || '').toLowerCase().includes(t) ||
    (i.category || '').toLowerCase().includes(t)
  )
}

export function onLatestListings(cb: (items: Listing[])=>void){
  const q = query(listingsCol, orderBy('createdAt','desc'))
  return onSnapshot(q, snap=>{
    const items = snap.docs.map(d=> ({id:d.id, ...(d.data() as any)})) as Listing[]
    cb(items)
  })
}

export async function getListingsByCategory(categoryId:string){
  const q = query(listingsCol, where('category','==',categoryId), orderBy('createdAt','desc'))
  const snaps = await getDocs(q)
  return snaps.docs.map(d=>({id:d.id,...(d.data() as any)}) ) as Listing[]
}
