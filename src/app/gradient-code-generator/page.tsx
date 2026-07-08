import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Code Generator - Free Online Color Tool | ColorKits',
  description: 'Create beautiful gradient code with customizable options. Free online gradient code generator for web developers and designers. Generate with real-time preview and CSS code export.',
  keywords: ['gradient code generator', 'css gradient code', 'gradient css generator', 'gradient code', 'copy gradient css'],
  openGraph: {
    title: 'Gradient Code Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient code with customizable options.',
  },
  twitter: {
    title: 'Gradient Code Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient code with customizable options.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
