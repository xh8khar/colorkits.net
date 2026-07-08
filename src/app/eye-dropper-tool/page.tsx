import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Eye Dropper Tool - Free Online Color Tool | ColorKits',
  description: 'Use an eye dropper tool to pick colors from anywhere on screen. Free online eye dropper for designers and developers to sample and capture exact color values.',
  keywords: ['eye dropper tool', 'eye dropper tool tool', 'eye dropper tool online', 'eye dropper tool color tool'],
  openGraph: {
    title: 'Eye Dropper Tool - Free Online Color Tool | ColorKits',
    description: 'Use an eye dropper tool to pick colors from anywhere on screen.',
  },
  twitter: {
    title: 'Eye Dropper Tool - Free Online Color Tool | ColorKits',
    description: 'Use an eye dropper tool to pick colors from anywhere on screen.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
