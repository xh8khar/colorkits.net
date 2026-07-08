import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Lighten Color - Free Online Color Tool',
  description: 'Lighten Color. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
