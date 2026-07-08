'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { cssColorConverter } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Accessible Palette Generator"
      description="Generate color palettes that meet WCAG accessibility requirements."
      onConvert={cssColorConverter}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
