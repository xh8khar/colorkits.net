'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { randomColor } from '@/lib/converters'
const genRandom = () => randomColor()
const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Random Color Generator"
      description="Random Color Generator. Free online color tool for developers and designers."
      onConvert={genRandom}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
