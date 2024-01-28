'use server'

const { redirect } = require("next/navigation")

export async function register(formData) {
    const credentials = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPwsd')
    }

    const url = process.env.API_URL || 'http://localhost:4000/'

    const res = await fetch(`${url}api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

    if (res.ok) {
        redirect('/profile')
    } else {
        return {
            message: 'Invalid inputs'
        }
    }
}
