'use client'

import React from 'react';
import { useState } from 'react';
import { useAuth } from '../utils/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { setUser } = useAuth();
  const [credentials, setCredentials] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const url = process.env.API_URL || 'http://localhost:4000/'

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${url}api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await res.json();

      if (res.ok) {
        setUser({
          email: data.user.email,
          name: data.user.name, 
          id: data.user._id
        } )

        setCredentials({email: '', password: ''})
        setLoading(false);
        setError('');

        router.push('/profile')
      } else {
        setLoading(false);
        setError('Invalid inputs. Please enter valid email and password!')
      };
    } catch (error) {
      console.log(error)
      setError('Something went wrong. Please try again!');
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    handleLogin();
  }

  return (
    <main>
      <h1>Login</h1>
  
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input 
            type="email"
            id="email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            required
          />
        </label>
  
        <label htmlFor="password">
          Password
          <input
            type="password" 
            id="password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
          />
        </label>

        <p>{error}</p>
        <button type="submit" disabled={loading ? true : false}>
          Login
        </button>
      </form>
    </main>
  )
}
