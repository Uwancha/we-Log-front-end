"use client"

import React from 'react';
import Link from 'next/link';

// useAuth hook to access user authentication state
import { useAuth } from '../utils/auth'

// Header component renders the application header with dynamic navigation links based on user authentication
export default function Header() {
    // Destructure user state from useAuth hook
    const { user } = useAuth();
    
    return (

        <nav>
            <div>
                <p alt='weLog logo'>weLog</p>
            </div>

            <div>
                {user ?
                (
                    <div>
                        <Link href='/createPost'>Create Post</Link>
                        <Link href='/logout'>Logout</Link>
                        <Link href='/profile'>{user.name}</Link>
                    </div>
                ) : (
                    <div>
                        {/* Non-authenteated users are redirected to login page when trying to create a post */}
                        <Link href='/createPost'>Create Post</Link>
                        <Link href='/login'>Login</Link>
                        <Link href='/register'>Register</Link>
                    </div>
                )}
            </div>
        </nav>
    )
}
