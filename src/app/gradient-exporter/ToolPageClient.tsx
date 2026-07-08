'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { cssColorConverter } from '@/lib/converters'

const example = '#ff0044\n#00ff88'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Gradient Exporter"
      description="Gradient Exporter. Free online color tool for developers and designers."
      onConvert={cssColorConverter}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
