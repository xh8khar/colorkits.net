import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'SaaS Palette - Free Online Color Tool',
  description: 'SaaS Palette. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
