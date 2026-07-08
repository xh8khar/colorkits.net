import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Desaturate Color - Free Online Color Tool',
  description: 'Desaturate Color. Free online color tool for developers and designers.',
}

export default function Page() {
  return <ToolPageClient />
}
