/**
 * Register component.
 * This component handles user registration by collecting credentials,
 * send them to server action. Then the server action handles request to the API and responses.
 */
'use client'

import { useRef } from "react";
import { useFormState } from "react-dom";
import { register } from "../actions";
import { SubmitButton } from "../components/SubmitButton";
import { useRouter } from "next/navigation";

export default function Register() {
  const formRef = useRef(null);

  // Destructure server action and its response from useFormState
  const [formState, formAction] = useFormState(register, {
    success: false, message: '', error: null
  });

  // Navigate user to login page on success response from the server action
  const router = useRouter();
  if (formState?.success) {
    formRef.current?.reset();
    router.push('/login')
  };

  return (
    <main>
      <h1>Register</h1>
  
      {/** On form submit send form data to server action */}
      <form ref={formRef} action={formAction}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            minLength={3}
            required
          />
          <span className="text-red">
            {formState?.error?.name ? formState.error.name : '' }
          </span>
        </label>
  
        <label htmlFor="email">
          Email
          <input 
            type="email"
            id="email"
            name="email"
            required
          />
          <span className="text-red">
            {formState?.error?.email ? formState.error.email : '' }
          </span>
        </label>
  
        <label htmlFor="password">
          Password
          <input
            type="password" 
            id="password"
            name="password"
            min={8}
            required
          />
          <span className="text-red">
            {formState?.error?.password ? formState.error.name : '' }
          </span>
        </label>

        <label htmlFor="confirmPswd">
          Confirm Password
          <input
            type="password" 
            id="confirmPswd"
            name="confirmPwsd"
            min={8}
            required
          />
          <span className="text-red">
            {formState?.error?.confirm ? formState.error.confirm : '' }
          </span>
        </label>

        <p className="text-red">{formState?.message}</p>
        <SubmitButton text={'Register'} />
      </form>
    </main>
  )
}
