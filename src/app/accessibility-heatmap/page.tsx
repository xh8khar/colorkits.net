import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Accessibility Heatmap - Free Online Color Tool | ColorKits',
  description: 'Check color contrast against WCAG accessibility standards. Free online accessibility heatmap for web developers and designers. Ensure your designs meet WCAG 2.2 AA and AAA requirements with detailed pass/fail analysis.',
  keywords: ['accessibility heatmap', 'accessibility heatmap tool', 'web accessibility contrast', 'wcag 2.2 compliance', 'accessibility checker'],
  openGraph: {
    title: 'Accessibility Heatmap - Free Online Color Tool | ColorKits',
    description: 'Check color contrast against WCAG accessibility standards.',
  },
  twitter: {
    title: 'Accessibility Heatmap - Free Online Color Tool | ColorKits',
    description: 'Check color contrast against WCAG accessibility standards.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
