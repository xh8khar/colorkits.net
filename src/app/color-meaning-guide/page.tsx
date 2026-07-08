import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Meaning Guide - Free Online Color Tool',
  description: 'Color Meaning Guide. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
