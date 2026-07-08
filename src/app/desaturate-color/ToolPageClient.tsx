'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { cssColorConverter } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Desaturate Color"
      description="Desaturate Color. Free online color tool for developers and designers."
      onConvert={cssColorConverter}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
