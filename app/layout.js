import './globals.css'


export const metadata = {
  title: 'Blog | Home',
  description: 'Blog home',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
