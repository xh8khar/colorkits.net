import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Desaturate Color - Free Online Color Tool | ColorKits',
  description: 'Convert colors to desaturated with adjustable intensity. Free online desaturate color for designers and developers. Create desaturated versions of any color with real-time preview and multiple format output.',
  keywords: ['desaturate color', 'desaturate color tool', 'desaturated converter', 'color to desaturated', 'desaturated effect'],
  openGraph: {
    title: 'Desaturate Color - Free Online Color Tool | ColorKits',
    description: 'Convert colors to desaturated with adjustable intensity.',
  },
  twitter: {
    title: 'Desaturate Color - Free Online Color Tool | ColorKits',
    description: 'Convert colors to desaturated with adjustable intensity.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
