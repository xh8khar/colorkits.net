import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Wallpaper Palette Extractor - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online wallpaper palette extractor for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['wallpaper palette extractor', 'wallpaper palette extractor tool', 'wallpaper palette extractor online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Wallpaper Palette Extractor - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Wallpaper Palette Extractor - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
