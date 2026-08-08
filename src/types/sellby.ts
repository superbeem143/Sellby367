export type Category = {
  id: string
  name: string
}

export type Listing = {
  id: string
  category: string
  title: string
  price: number
  location: string
  description: string
  images: string[]
  sellerId: string
  metadata?: Record<string, any>
  createdAt:any
  status: 'active'|'sold'|'removed'
}

export type Message = {
  id: string
  senderId: string
  text: string
  imageUrl?: string
  createdAt:any
  read?: boolean
}

export type ChatThread = {
  id: string
  listingId: string
  buyerId: string
  sellerId: string
  lastMessage: string
  updatedAt:any
}

export type AuthUser = {
  id: string
  name: string
  email: string
  avatarUrl?: string
  createdAt?: any
}
