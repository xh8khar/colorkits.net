import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Tritanopia Simulator - Free Online Color Tool | ColorKits',
  description: 'Simulate color vision deficiencies to design for accessibility. Free online tritanopia simulator for designers and developers. Preview how your designs appear to users with color blindness and other visual impairments.',
  keywords: ['tritanopia simulator', 'tritanopia simulator online', 'color blindness simulator', 'accessibility testing tool', 'color vision deficiency simulator'],
  openGraph: {
    title: 'Tritanopia Simulator - Free Online Color Tool | ColorKits',
    description: 'Simulate color vision deficiencies to design for accessibility.',
  },
  twitter: {
    title: 'Tritanopia Simulator - Free Online Color Tool | ColorKits',
    description: 'Simulate color vision deficiencies to design for accessibility.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
