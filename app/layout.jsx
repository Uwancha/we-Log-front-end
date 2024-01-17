import './globals.css'
import { AuthProvider } from './utils/auth'


export const metadata = {
  title: 'Blog | Home',
  description: 'Blog home',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          {children}
        </body>
      </AuthProvider>
    </html>
  )
}
