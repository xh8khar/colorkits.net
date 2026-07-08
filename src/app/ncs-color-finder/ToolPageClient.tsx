'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { colorName } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="NCS Color Finder"
      description="NCS Color Finder. Free online color tool for developers and designers."
      onConvert={colorName}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
