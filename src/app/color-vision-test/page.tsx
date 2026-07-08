import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Vision Test - Free Online Color Tool | ColorKits',
  description: 'Simulate color vision deficiencies to design for accessibility. Free online color vision test for designers and developers. Preview how your designs appear to users with color blindness and other visual impairments.',
  keywords: ['color vision test', 'color vision test online', 'color blindness simulator', 'accessibility testing tool', 'color vision deficiency simulator'],
  openGraph: {
    title: 'Color Vision Test - Free Online Color Tool | ColorKits',
    description: 'Simulate color vision deficiencies to design for accessibility.',
  },
  twitter: {
    title: 'Color Vision Test - Free Online Color Tool | ColorKits',
    description: 'Simulate color vision deficiencies to design for accessibility.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
