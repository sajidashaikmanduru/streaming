import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function EditVideo() {
  const { id } = useParams()

  const [video, setVideo] = useState(null)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const nav = useNavigate()

  useEffect(() => {
    api.get(`/videos/${id}`).then(r => {
      setVideo(r.data)
      setTitle(r.data.title)
      setDesc(r.data.description)
    })
  }, [id])

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/videos/${id}`, { title, description: desc })
      alert('Updated')
      nav('/')
    } catch (err) {
      alert('Update failed')
    }
  }

  if (!video) return <div>Loading...</div>

  return (
    <div className="card">
      <h2>Edit</h2>
      <form onSubmit={submit} className="form">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />

        <button className="btn">Save</button>
      </form>
    </div>
  )
}
