import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'National Flag Colors - Free Online Color Tool | ColorKits',
  description: 'Browse country flag colors for your design projects. Free online national flag color reference tool for designers. Find official flag color codes with HEX, RGB, and CMYK values for any country.',
  keywords: ['flag colors', 'country flag colors', 'national flag colors', 'flag color codes', 'flag color reference'],
  openGraph: {
    title: 'National Flag Colors - Free Online Color Tool | ColorKits',
    description: 'Browse country flag colors for your design projects.',
  },
  twitter: {
    title: 'National Flag Colors - Free Online Color Tool | ColorKits',
    description: 'Browse country flag colors for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
