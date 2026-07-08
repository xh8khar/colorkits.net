import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'C# Color Converter - Free Online Color Tool | ColorKits',
  description: 'Convert csharp color converter between different color formats and systems. Free online csharp color converter for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.',
  keywords: ['csharp color converter', 'csharp color converter converter', 'csharp color converter tool', 'csharp color converter online', 'color converter'],
  openGraph: {
    title: 'C# Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert csharp color converter between different color formats and systems.',
  },
  twitter: {
    title: 'C# Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert csharp color converter between different color formats and systems.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
