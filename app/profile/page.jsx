import { cookies } from 'next/headers';

// Fetch user profile data taking token and user id
const getUser = async ({userId, token}) => {
  try {
    const url = process.env.API_URL || 'http://localhost:4000/'
    
    // Send request to user profile data endpoint
    const res = await fetch(`${url}api/profile/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    })
    
    // Handle response
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('Failed to fetch!')
    }
  } catch (error) {
    // Handle unexpected errors
    throw new Error('Something Went wrong. Try again')
  }
}

export default async function Profile() {
  // Retrieve user id and token from cookies stored during login
  const cookieStore = cookies()
  const user = cookieStore.get('user')
  const tokencookie = cookieStore.get('token')

  const userId =  user.value
  const token = tokencookie.value

  // Get user data using the id and token
  const data = await getUser({userId, token});

  return (
    <main>
      <p>Profile</p>
    </main>
  )
}