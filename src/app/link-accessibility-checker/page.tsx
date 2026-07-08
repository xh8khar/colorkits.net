import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Link Accessibility Checker - Free Online Color Tool | ColorKits',
  description: 'Check link contrast against WCAG accessibility standards. Free online link accessibility checker for web developers and designers. Ensure your designs meet WCAG 2.2 AA and AAA requirements with detailed pass/fail analysis.',
  keywords: ['link accessibility checker', 'link accessibility checker tool', 'web accessibility contrast', 'wcag 2.2 compliance', 'accessibility checker'],
  openGraph: {
    title: 'Link Accessibility Checker - Free Online Color Tool | ColorKits',
    description: 'Check link contrast against WCAG accessibility standards.',
  },
  twitter: {
    title: 'Link Accessibility Checker - Free Online Color Tool | ColorKits',
    description: 'Check link contrast against WCAG accessibility standards.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
