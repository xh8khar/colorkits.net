import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Vibrance Adjuster - Free Online Color Tool',
  description: 'Vibrance Adjuster. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
