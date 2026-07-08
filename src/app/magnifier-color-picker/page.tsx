import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Magnifier Color Picker - Free Online Color Tool | ColorKits',
  description: 'Magnify and pick colors from images with precision zoom controls. Free online magnifier color picker for detailed color selection and analysis.',
  keywords: ['magnifier color picker', 'magnifier color picker tool', 'magnifier color picker online', 'magnifier color picker color tool'],
  openGraph: {
    title: 'Magnifier Color Picker - Free Online Color Tool | ColorKits',
    description: 'Magnify and pick colors from images with precision zoom controls.',
  },
  twitter: {
    title: 'Magnifier Color Picker - Free Online Color Tool | ColorKits',
    description: 'Magnify and pick colors from images with precision zoom controls.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
