import React, { useState } from 'react'

export default function SearchBar({ onSearch }:{ onSearch:(term:string)=>void }){
  const [term,setTerm] = useState('')
  function submit(e:React.FormEvent){ e.preventDefault(); onSearch(term) }
  return (
    <form onSubmit={submit} className="flex">
      <input value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search listings, location, category" className="flex-1 p-2 border rounded-l" />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded-r">Search</button>
    </form>
  )
}
