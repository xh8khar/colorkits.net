import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Accessibility Palette Optimizer - Free Online Color Tool | ColorKits',
  description: 'Check color contrast against WCAG accessibility standards. Free online accessibility palette optimizer for web developers and designers. Ensure your designs meet WCAG 2.2 AA and AAA requirements with detailed pass/fail analysis.',
  keywords: ['accessibility palette optimizer', 'accessibility palette optimizer tool', 'web accessibility contrast', 'wcag 2.2 compliance', 'accessibility checker'],
  openGraph: {
    title: 'Accessibility Palette Optimizer - Free Online Color Tool | ColorKits',
    description: 'Check color contrast against WCAG accessibility standards.',
  },
  twitter: {
    title: 'Accessibility Palette Optimizer - Free Online Color Tool | ColorKits',
    description: 'Check color contrast against WCAG accessibility standards.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
