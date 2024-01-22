"use client";

import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [credentials , setCredentials] = useState({name: '', email: '', password: '', confirmPswd: ''});
  const [error, setError] = useState('');

  const router = useRouter()
  
  const url = process.env.API_URL || 'http://localhost:4000/'
    
  const handleRegister = async () => {
      
  const response = await fetch(`${url}api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })

  if (response.ok) {
    router.push('/login');
  } else {
    setError(response.message)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };
  
  return (
    <main>
      <h1>Register</h1>
  
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            value={credentials.name}
            onChange={(e) => setCredentials({...credentials, name: e.target.value})}
            required
          />
        </label>
  
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

        <label htmlFor="confirmPswd">
          Password
          <input
            type="password" 
            id="confirmPswd"
            value={credentials.confirmPswd}
            onChange={(e) => setCredentials({...credentials, confirmPswd: e.target.value})}
            required
          />
        </label>
  
        <button type="submit">Register</button>
      </form>
    </main>
  )
}
