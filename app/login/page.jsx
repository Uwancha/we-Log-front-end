'use client'

import { login } from "../actions";
import {useFormState} from "react-dom"
import { SubmitButton } from "../components/SubmitButton";
import { useRef } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const formRef = useRef(null)
  const [formState, formAction] = useFormState(login, {
    success: false, message: '', error: null, 
  })
  
  const router = useRouter()
  if (formState?.success) {
    formRef.current?.reset();
    router.push('/profile')
  }; 
  
  return (
    <main>
      <h1>Login</h1>
  
      <form ref={formRef} action={formAction}>
        <label htmlFor="email">
          Email
          <input 
            type="email"
            id="email"
            name="email"
            required
          />
          <span>
            {formState?.error?.email}
          </span>
        </label>
  
        <label htmlFor="password">
          Password
          <input
            type="password" 
            id="password"
            name="password"
            required
          />
          <span>
            {formState?.error?.password}
          </span>
        </label>

        <p>{formState?.message}</p>
        <SubmitButton text={'Login'} />
      </form>
    </main>
  )
} 