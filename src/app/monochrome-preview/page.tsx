import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Monochrome Preview - Free Online Color Tool | ColorKits',
  description: 'Preview monochrome preview in real-time for your design projects. Free online monochrome preview for designers and developers. Visualize colors and gradients in different contexts with instant updates.',
  keywords: ['monochrome preview', 'monochrome preview preview', 'monochrome preview tool', 'monochrome preview online', 'color preview'],
  openGraph: {
    title: 'Monochrome Preview - Free Online Color Tool | ColorKits',
    description: 'Preview monochrome preview in real-time for your design projects.',
  },
  twitter: {
    title: 'Monochrome Preview - Free Online Color Tool | ColorKits',
    description: 'Preview monochrome preview in real-time for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
