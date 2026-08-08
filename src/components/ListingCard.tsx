import React from 'react'
import { Listing } from '../types/sellby'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../lib/utils'

export default function ListingCard({ listing }:{ listing:Listing }){
  return (
    <Link to={`/ad/${listing.id}`} className="border rounded overflow-hidden block">
      <div className="h-44 bg-gray-200 flex items-center justify-center">
        {listing.images?.[0] ? <img src={listing.images[0]} alt={listing.title} className="object-cover h-44 w-full" /> : <div className="text-gray-500">No image</div>}
      </div>
      <div className="p-3">
        <div className="font-semibold">{listing.title}</div>
        <div className="text-sm text-gray-600">{formatCurrency(listing.price)}</div>
        <div className="text-xs text-gray-500">{listing.location}</div>
      </div>
    </Link>
  )
}
