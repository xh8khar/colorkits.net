import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'OKLab Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick OKLab color space values with an interactive picker. Free online OKLab color picker for perceptually uniform color selection in modern design workflows.',
  keywords: ['oklab color picker', 'oklab color picker tool', 'oklab color picker online', 'oklab color picker color tool'],
  openGraph: {
    title: 'OKLab Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick OKLab color space values with an interactive picker.',
  },
  twitter: {
    title: 'OKLab Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick OKLab color space values with an interactive picker.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
