import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Dashboard Accessibility Checker - Free Online Color Tool | ColorKits',
  description: 'Check dashboard contrast against WCAG accessibility standards. Free online dashboard accessibility checker for web developers and designers. Ensure your designs meet WCAG 2.2 AA and AAA requirements with detailed pass/fail analysis.',
  keywords: ['dashboard accessibility checker', 'dashboard accessibility checker tool', 'web accessibility contrast', 'wcag 2.2 compliance', 'accessibility checker'],
  openGraph: {
    title: 'Dashboard Accessibility Checker - Free Online Color Tool | ColorKits',
    description: 'Check dashboard contrast against WCAG accessibility standards.',
  },
  twitter: {
    title: 'Dashboard Accessibility Checker - Free Online Color Tool | ColorKits',
    description: 'Check dashboard contrast against WCAG accessibility standards.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
