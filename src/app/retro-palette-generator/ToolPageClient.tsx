'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { generateShades } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Retro Palette Generator"
      description="Retro Palette Generator. Free online color tool for developers and designers."
      onConvert={generateShades}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
