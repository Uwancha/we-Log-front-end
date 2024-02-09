// Send resquest to the API to get all posts that'll be displayed in the blog home page
const getAllPosts = async () => {
  try {
    const url = process.env.API_URL || 'http://localhost:4000/'

    const res = await fetch(`${url}api/posts`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!res.ok) {
      throw new Error('Server error. Failed to fetch!')
    }

    return res.json()
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}

export default async function Home() {
  const data = await getAllPosts()

  return (
    <main>
      <h1>Blog Home</h1>
    </main>
  )
}
