import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Adobe ASE Export - Free Online Color Tool | ColorKits',
  description: 'Export adobe ase export in multiple formats for your projects. Free online adobe ase export for developers and designers. Generate and download color assets with copy-ready code snippets.',
  keywords: ['adobe ase export', 'adobe ase export tool', 'adobe ase export online', 'color exporter', 'design export tool'],
  openGraph: {
    title: 'Adobe ASE Export - Free Online Color Tool | ColorKits',
    description: 'Export adobe ase export in multiple formats for your projects.',
  },
  twitter: {
    title: 'Adobe ASE Export - Free Online Color Tool | ColorKits',
    description: 'Export adobe ase export in multiple formats for your projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
