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

    if (res.ok) {
      return res.json()
    } else {
      throw new Error('Failed to fetch!')
    }

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
