import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HWB to RGB Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HWB (Hue, Whiteness, Blackness) color values to RGB format instantly. Free online HWB to RGB converter for modern CSS color format support.',
  keywords: ['hwb to rgb', 'hwb to rgb converter', 'hwb to rgb color', 'hwb color to rgb', 'hwb converter'],
  openGraph: {
    title: 'HWB to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HWB (Hue, Whiteness, Blackness) color values to RGB format instantly.',
  },
  twitter: {
    title: 'HWB to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HWB (Hue, Whiteness, Blackness) color values to RGB format instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
