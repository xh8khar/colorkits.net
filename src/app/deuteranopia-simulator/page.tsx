import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Deuteranopia Simulator - Free Online Color Tool | ColorKits',
  description: 'Simulate color vision deficiencies to design for accessibility. Free online deuteranopia simulator for designers and developers. Preview how your designs appear to users with color blindness and other visual impairments.',
  keywords: ['deuteranopia simulator', 'deuteranopia simulator online', 'color blindness simulator', 'accessibility testing tool', 'color vision deficiency simulator'],
  openGraph: {
    title: 'Deuteranopia Simulator - Free Online Color Tool | ColorKits',
    description: 'Simulate color vision deficiencies to design for accessibility.',
  },
  twitter: {
    title: 'Deuteranopia Simulator - Free Online Color Tool | ColorKits',
    description: 'Simulate color vision deficiencies to design for accessibility.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
