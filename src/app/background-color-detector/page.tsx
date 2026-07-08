import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Background Color Detector - Free Online Color Tool | ColorKits',
  description: 'Detect and identify background colors from images and designs. Free online background color detector for analyzing color schemes and extracting dominant background hues.',
  keywords: ['background color detector', 'background color detector tool', 'background color detector online', 'background color detector color tool'],
  openGraph: {
    title: 'Background Color Detector - Free Online Color Tool | ColorKits',
    description: 'Detect and identify background colors from images and designs.',
  },
  twitter: {
    title: 'Background Color Detector - Free Online Color Tool | ColorKits',
    description: 'Detect and identify background colors from images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
