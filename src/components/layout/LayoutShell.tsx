'use client'

import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('./Navbar'), { ssr: false })
const Footer = dynamic(() => import('./Footer'), { ssr: false })

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
