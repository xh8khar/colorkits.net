import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Browser Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick colors from web pages in your browser. Free online browser color picker for web developers and designers to inspect and capture colors from any webpage.',
  keywords: ['browser color picker', 'browser color picker tool', 'browser color picker online', 'browser color picker color tool'],
  openGraph: {
    title: 'Browser Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick colors from web pages in your browser.',
  },
  twitter: {
    title: 'Browser Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick colors from web pages in your browser.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
