import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Text Contrast Generator - Free Online Color Tool | ColorKits',
  description: 'Check text contrast against WCAG accessibility standards. Free online text contrast for web developers and designers. Ensure your designs meet WCAG 2.2 AA and AAA requirements with detailed pass/fail analysis.',
  keywords: ['text contrast', 'text contrast tool', 'web accessibility contrast', 'wcag 2.2 compliance', 'accessibility checker'],
  openGraph: {
    title: 'Text Contrast Generator - Free Online Color Tool | ColorKits',
    description: 'Check text contrast against WCAG accessibility standards.',
  },
  twitter: {
    title: 'Text Contrast Generator - Free Online Color Tool | ColorKits',
    description: 'Check text contrast against WCAG accessibility standards.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
