'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { oklabToHex } from '@/lib/converters'

const example = 'oklab(0.5, 0.3, 0.1)'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="OKLab to HEX"
      description="OKLab to HEX. Free online color tool for developers and designers."
      onConvert={oklabToHex}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
