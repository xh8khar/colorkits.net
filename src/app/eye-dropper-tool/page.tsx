import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Eye Dropper Tool - Free Online Color Tool',
  description: 'Eye Dropper Tool. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
