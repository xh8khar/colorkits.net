'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { cssColorConverter } from '@/lib/converters'

const example = '#ff0044\n#00ff44\n#0044ff'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Batch Color Converter"
      description="Batch Color Converter. Free online color tool for developers and designers."
      onConvert={cssColorConverter}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
