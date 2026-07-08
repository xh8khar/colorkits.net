import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Background Contrast Generator - Free Online Color Tool | ColorKits',
  description: 'Check background contrast against WCAG accessibility standards. Free online background contrast for web developers and designers. Ensure your designs meet WCAG 2.2 AA and AAA requirements with detailed pass/fail analysis.',
  keywords: ['background contrast', 'background contrast tool', 'web accessibility contrast', 'wcag 2.2 compliance', 'accessibility checker'],
  openGraph: {
    title: 'Background Contrast Generator - Free Online Color Tool | ColorKits',
    description: 'Check background contrast against WCAG accessibility standards.',
  },
  twitter: {
    title: 'Background Contrast Generator - Free Online Color Tool | ColorKits',
    description: 'Check background contrast against WCAG accessibility standards.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
