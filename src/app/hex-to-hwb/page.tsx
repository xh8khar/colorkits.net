import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HEX to HWB Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HEX color codes to HWB (Hue, Whiteness, Blackness) values instantly. Free online HEX to HWB converter for CSS Color Module Level 4 color format support.',
  keywords: ['hex to hwb', 'hex to hwb converter', 'hwb converter', 'hex to hwb color', 'hwb color converter'],
  openGraph: {
    title: 'HEX to HWB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to HWB (Hue, Whiteness, Blackness) values instantly.',
  },
  twitter: {
    title: 'HEX to HWB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to HWB (Hue, Whiteness, Blackness) values instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
