'use client'
/**
 * This SubmitButton is a reusable button used accross the app
 * for form submitting.
 */

import { useFormStatus } from 'react-dom';

export function SubmitButton({text}) {
    const { pending } = useFormStatus()
   
    return (
      <button type="submit" aria-disabled={pending}>
        {text}
      </button>
    )
}