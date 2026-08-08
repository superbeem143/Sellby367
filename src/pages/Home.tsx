import React from 'react'
import { CATEGORIES } from '../lib/sellby-data'
import CategoryCard from '../components/CategoryCard'
import ListingCard from '../components/ListingCard'
import SearchBar from '../components/SearchBar'
import { useListings } from '../hooks/useListings'
import { Link } from 'react-router-dom'

export default function Home(){
  const { listings, loading, search } = useListings()

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold">SELLBY</div>
          <div className="text-sm text-gray-500">Sell Easy. Buy Easy.</div>
        </div>
        <Link to="/post" className="bg-blue-600 text-white px-4 py-2 rounded">Add Ad</Link>
      </div>

      <SearchBar onSearch={search} />

      <div className="grid grid-cols-3 gap-2 mt-4">
        {CATEGORIES.map(c=> <CategoryCard key={c.id} category={c} />)}
      </div>

      <h3 className="mt-6 mb-2 font-semibold">Latest Listings</h3>
      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {listings.map(l=> <ListingCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  )
}
