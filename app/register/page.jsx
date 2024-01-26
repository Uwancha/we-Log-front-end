"use client";

/**
 * Register component.
 * This component handles user registration by collecting credentials,
 * send request to the API and handling responses.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  // State to track user form inputs 
  const [credentials , setCredentials] = useState({name: '', email: '', password: '', confirmPswd: ''});

  // State to track error and pending state
  const [error, setError] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  // Hook to conditionally navigate pages
  const router = useRouter();
  
  // API URL
  const url = process.env.API_URL || 'http://localhost:4000/'
   
  // Send registration request to the api
  const handleRegister = async () => {
    try {
      // Make POST request to registration endpoint
      const res = await fetch(`${url}api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      // Check response status and handle succes and failure
      if (res.ok) {
        router.push('/login');
        setError('');
        setSubmitStatus('');
      } else {
        setSubmitStatus('');
        setError('Please enter valid data.');
      }

    } catch (error) {
      // Handle unexpected errors
      setSubmitStatus('')
      setError('An error has occurred. Try again!')
    }
  };

  // Submit form handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('Registering...')
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

        <p>{error}</p>
        <button type="submit">
          {submitStatus? submitStatus : 'Register'}
        </button>
      </form>
    </main>
  )
}
