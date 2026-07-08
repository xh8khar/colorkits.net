'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { colorName } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="JSON Palette Generator"
      description="Generate structured JSON palette files for your design system."
      onConvert={colorName}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
