'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { cssColorConverter } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Accessibility Palette Optimizer"
      description="Optimize your color palette to maximize accessibility compliance."
      onConvert={cssColorConverter}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
