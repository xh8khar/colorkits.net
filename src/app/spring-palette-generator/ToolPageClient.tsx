'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { generateShades } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Spring Palette Generator"
      description="Spring Palette Generator. Free online color tool for developers and designers."
      onConvert={generateShades}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
