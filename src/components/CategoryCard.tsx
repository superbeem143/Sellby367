import React from 'react'
import { Link } from 'react-router-dom'
import { Category } from '../types/sellby'

export default function CategoryCard({category}:{category:Category}){
  return (
    <Link to={`/category/${category.id}`} className="border rounded p-3 flex-1 text-center">
      {category.name}
    </Link>
  )
}
