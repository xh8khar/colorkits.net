'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { colorName } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Palette Exporter"
      description="Export your color palettes in CSS, SCSS, JSON, and other popular formats."
      onConvert={colorName}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
