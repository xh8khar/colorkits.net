import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'NCS Color Finder - Free Online Color Tool | ColorKits',
  description: 'Find Natural Color System (NCS) codes with digital color values. Free online NCS color finder for designers. Look up NCS notation with HEX and RGB equivalents for accurate color matching.',
  keywords: ['ncs finder', 'ncs colors', 'natural color system', 'ncs color lookup', 'ncs to hex'],
  openGraph: {
    title: 'NCS Color Finder - Free Online Color Tool | ColorKits',
    description: 'Find Natural Color System (NCS) codes with digital color values.',
  },
  twitter: {
    title: 'NCS Color Finder - Free Online Color Tool | ColorKits',
    description: 'Find Natural Color System (NCS) codes with digital color values.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
