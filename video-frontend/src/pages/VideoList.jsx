import React, { useEffect, useState } from 'react'
import api from '../api/api'
import VideoPlayer from './VideoPlayer'

export default function VideoList() {

  const [videos, setVideos] = useState([])

  useEffect(() => {
    api.get('/videos')
      .then(r => setVideos(r.data))
      .catch(() => {})
  }, [])

  return (
    <div>
      <h2>All Videos</h2>

      <div className="grid">
        {videos.map(v => (
          <div className="card" key={v.id}>
            <h3>{v.title}</h3>
            <p className="muted">{v.description}</p>
            <VideoPlayer filename={v.filename} />
          </div>
        ))}
      </div>
    </div>
  )
}
