import React from 'react'
import { CATEGORIES } from '../lib/sellby-data'
import CategoryCard from '../components/CategoryCard'
import ListingCard from '../components/ListingCard'
import SearchBar from '../components/SearchBar'
import { useListings } from '../hooks/useListings'
import { Link } from 'react-router-dom'

export default function Home() {
  const { listings, loading, search } = useListings()

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            S
          </div>

          <div>
            <div className="text-xl font-extrabold text-gray-900">
              SELLBY
            </div>
            <div className="text-xs text-gray-500">
              Sell Easy. Buy Easy.
            </div>
          </div>
        </div>

        <Link
          to="/login"
          className="text-blue-600 font-semibold text-sm"
        >
          Login
        </Link>
      </header>


      {/* Main */}
      <main className="px-4 pt-5 pb-24 max-w-6xl mx-auto">

        {/* Welcome */}
        <div className="mb-5">
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
            Find what you need.
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Buy easy. Sell easy.
          </p>
        </div>


        {/* Search */}
        <div className="mb-6">
          <SearchBar onSearch={search} />
        </div>


        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">
              Categories
            </h2>

            <span className="text-sm text-blue-600 font-medium">
              Browse
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
              />
            ))}
          </div>
        </section>


        {/* Latest Listings */}
        <section className="mt-7">

          <div className="mb-3">
            <h2 className="text-lg font-bold text-gray-900">
              Latest Listings
            </h2>

            <p className="text-xs text-gray-500">
              Recently posted items
            </p>
          </div>

          {loading ? (
            <div className="py-10 text-center text-gray-500">
              Loading...
            </div>
          ) : listings.length === 0 ? (

            <div className="py-12 text-center">
              <div className="text-5xl mb-3">
                🛍️
              </div>

              <h3 className="font-bold text-gray-800">
                No listings yet
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Be the first person to post an ad.
              </p>
            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                />
              ))}
            </div>

          )}

        </section>

      </main>


      {/* Floating Add Ad Button */}
      <Link
        to="/post"
        className="
          fixed
          right-4
          bottom-20
          z-30
          bg-orange-500
          hover:bg-orange-600
          text-white
          font-bold
          px-5
          py-3
          rounded-full
          shadow-lg
          flex
          items-center
          gap-2
          active:scale-95
          transition
        "
      >
        <span className="text-xl">+</span>
        <span>Add Ad</span>
      </Link>


      {/* Mobile Bottom Navigation */}
      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-20
          bg-white
          border-t
          shadow-[0_-2px_10px_rgba(0,0,0,0.05)]
          h-16
          flex
          items-center
          justify-around
        "
      >

        <Link
          to="/"
          className="flex flex-col items-center justify-center text-blue-600 text-xs font-semibold"
        >
          <span className="text-xl">⌂</span>
          Home
        </Link>

        <Link
          to="/post"
          className="flex flex-col items-center justify-center text-gray-500 text-xs"
        >
          <span className="text-xl">＋</span>
          Add Ad
        </Link>

        <Link
          to="/chats"
          className="flex flex-col items-center justify-center text-gray-500 text-xs"
        >
          <span className="text-xl">💬</span>
          Chats
        </Link>

        <Link
          to="/saved"
          className="flex flex-col items-center justify-center text-gray-500 text-xs"
        >
          <span className="text-xl">♡</span>
          Saved
        </Link>

      </nav>

    </div>
  )
}