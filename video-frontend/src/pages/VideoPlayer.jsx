import React from 'react'

export default function VideoPlayer({ filename }) {
  if (!filename) return null

  const src =
    `${import.meta.env.VITE_API_URL || 'http://localhost:2222'}/api/videos/stream/${filename}`

  return (
    <video controls width="100%" className="video">
      <source src={src} />
      Your browser does not support the video tag.
    </video>
  )
}
