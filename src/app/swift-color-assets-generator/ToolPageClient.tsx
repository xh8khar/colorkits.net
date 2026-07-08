'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { colorName } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Swift Color Assets Generator"
      description="Generate Swift color asset definitions for iOS development."
      onConvert={colorName}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
