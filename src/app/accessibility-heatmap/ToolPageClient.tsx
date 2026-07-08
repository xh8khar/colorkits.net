'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { cssColorConverter } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Accessibility Heatmap"
      description="Visualize accessibility issues across your color palette with a heatmap."
      onConvert={cssColorConverter}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
