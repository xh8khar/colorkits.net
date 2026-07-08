import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Psychological Colors Guide - Free Online Color Tool',
  description: 'Psychological Colors Guide. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
