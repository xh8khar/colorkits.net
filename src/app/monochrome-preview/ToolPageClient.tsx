'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { cssColorConverter } from '@/lib/converters'
const toGrayscale = (input: string) => {
  const hex = cssColorConverter(input)
  return `Grayscale: ${hex}`
}
const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Monochrome Preview"
      description="Preview your designs in grayscale to test contrast and readability."
      onConvert={toGrayscale}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
