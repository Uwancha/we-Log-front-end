'use server'
import { cookies } from "next/headers";

export async function register(formState, formData) {
    const credentials = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPwsd')
    };
   
    if (credentials.password !== credentials.confirmPassword || credentials.confirmPassword === '') {
        return {
            success: false,
            error: {
                confirm: 'Password do not match'
            }
        }
    };

    if (credentials.name === '') {
        return {
            error: {
                name: 'Name can not be empty and must be above 2 char'
            }
        }    
    };

    if (credentials.email === '') {
        return {
            error: {
                name: 'Email is required!'
            }
        }    
    };

    if (credentials.password === '') {
        return {
            success: false,
            error: {
                password: 'Password must be at least 8 char'
            }
        }  
    };
    const url = process.env.API_URL || 'http://localhost:4000/'

    try {
        const res = await fetch(`${url}api/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
    
        const data = await res.json();
        if (res.ok) {
            return {
                success: true
            }
        } else {
            if(data.error === 'User already exists') {
                return {
                    error: {
                        email: 'Email already used'
                    }
                }
            } else if(data.errors) {
                return {
                    message: 'Invalid inputs'
                }
            }       
        }
    } catch (error) {
        return {
            message: 'Something went wrong. Try again!'
        }
    }
}

export async function login (formState, formData) {
    const credentials = {
        email: formData.get('email'),
        password: formData.get('password')
    }
  
    if (credentials.email === '') {
        return {
            error: {
                name: 'Email is required!'
            }
        }    
    };
  
    if (credentials.password === '') {
        return {
            error: {
                password: 'Password must be at least 8 char'
            }
        }  
    };
  
    const url = process.env.API_URL || 'http://localhost:4000/'
  
    try {
        const res = await fetch(`${url}api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
  
        const data = await res.json();
  
        if (data.message === 'Successfull login') {
            cookies().set({
                name: 'token' ,
                value: data.token,
                httpOnly: true,
                path: '/',
            })
            cookies().set({
                name: 'user',
                value: data.user._id,
                httpOnly: true,
                path: '/',
            })
            return {
                success: true,
            }
        } else {
            if (data.message === 'Authentication failed') {
                return {
                    success: false, message: data.info.message
                }
            } 
            
            return {
                message: 'Login failed. Please try again!'
            } 
        }
    } catch (error) {
        return {
            message: 'Something went wrong. Try again!'
        }
    }
}