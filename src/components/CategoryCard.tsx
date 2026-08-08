import React from 'react'
import { Link } from 'react-router-dom'
import { Category } from '../types/sellby'

function CategoryArt({ type }: { type: string }) {
  const t = type.toLowerCase()

  if (t.includes('mobile') || t.includes('phone')) {
    return (
      <div className="text-[88px] leading-none select-none">
        📱
      </div>
    )
  }

  if (t.includes('car') || t.includes('bike')) {
    return (
      <div className="text-[88px] leading-none select-none">
        🚗
      </div>
    )
  }

  if (t.includes('propert') || t.includes('house')) {
    return (
      <div className="text-[88px] leading-none select-none">
        🏡
      </div>
    )
  }

  if (t.includes('electronic') || t.includes('laptop')) {
    return (
      <div className="text-[88px] leading-none select-none">
        💻
      </div>
    )
  }

  if (t.includes('furniture')) {
    return (
      <div className="text-[88px] leading-none select-none">
        🛋️
      </div>
    )
  }

  return (
    <div className="text-[88px] leading-none select-none">
      ✨
    </div>
  )
}

export default function CategoryCard({
  category,
}: {
  category: Category
}) {
  const type = `${category.id} ${category.name}`

  return (
    <Link
      to={`/category/${category.id}`}
      aria-label={category.name}
      className="
        group
        aspect-square
        w-full
        rounded-[28px]
        bg-white
        border
        border-gray-100
        shadow-[0_6px_20px_rgba(0,0,0,0.08)]
        flex
        items-center
        justify-center
        overflow-hidden
        transition-all
        duration-200
        active:scale-95
        hover:scale-[1.03]
        touch-manipulation
      "
    >
      <div
        className="
          w-full
          h-full
          flex
          items-center
          justify-center
          bg-gradient-to-br
          from-white
          to-gray-50
          group-hover:from-blue-50
          group-hover:to-orange-50
          transition-all
          duration-200
        "
      >
        <CategoryArt type={type} />
      </div>
    </Link>
  )
}