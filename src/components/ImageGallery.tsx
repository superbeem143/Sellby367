import React from 'react'

export default function ImageGallery({ images }:{ images:string[] }){
  if(!images || images.length===0) return <div className="h-48 bg-gray-100 flex items-center justify-center">No images</div>
  return (
    <div className="grid grid-cols-2 gap-1">
      {images.map((src,i)=> (
        <img key={i} src={src} alt={`img-${i}`} className="object-cover w-full h-40" />
      ))}
    </div>
  )
}
