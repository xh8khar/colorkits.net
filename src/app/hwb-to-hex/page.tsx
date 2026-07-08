import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HWB to HEX Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HWB (Hue, Whiteness, Blackness) color values to HEX codes instantly. Free online HWB to HEX converter supporting CSS Color Module Level 4 format.',
  keywords: ['hwb to hex', 'hwb to hex converter', 'hwb to hex code', 'hwb color to hex', 'hwb converter'],
  openGraph: {
    title: 'HWB to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HWB (Hue, Whiteness, Blackness) color values to HEX codes instantly.',
  },
  twitter: {
    title: 'HWB to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HWB (Hue, Whiteness, Blackness) color values to HEX codes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
