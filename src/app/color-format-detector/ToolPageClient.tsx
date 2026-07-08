'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { colorFormatDetector } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Color Format Detector"
      description="Color Format Detector. Free online color tool for developers and designers."
      onConvert={colorFormatDetector}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
