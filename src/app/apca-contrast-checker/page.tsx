import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'APCA Contrast Checker - Free Online Color Tool | ColorKits',
  description: 'Check color contrast against WCAG accessibility standards. Free online apca contrast checker for web developers and designers. Ensure your designs meet WCAG 2.2 AA and AAA requirements with detailed pass/fail analysis.',
  keywords: ['apca contrast checker', 'apca contrast checker tool', 'web accessibility contrast', 'wcag 2.2 compliance', 'accessibility checker'],
  openGraph: {
    title: 'APCA Contrast Checker - Free Online Color Tool | ColorKits',
    description: 'Check color contrast against WCAG accessibility standards.',
  },
  twitter: {
    title: 'APCA Contrast Checker - Free Online Color Tool | ColorKits',
    description: 'Check color contrast against WCAG accessibility standards.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
