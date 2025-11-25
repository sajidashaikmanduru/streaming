import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function Register() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { signup } = useContext(AuthContext)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await signup(username, password)
      alert('Registered — please login')
      nav('/login')
    } catch (err) {
      alert('Signup failed')
    }
  }

  return (
    <div className="card">
      <h2>Sign up</h2>

      <form onSubmit={submit} className="form">
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button type="submit" className="btn">Create account</button>
      </form>
    </div>
  )
}
