'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { colorFormatDetector } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="Color Format Detector" description="Color Format Detector. Free online color converter tool for developers." exampleInput={example} mode="detect" />
  )
}
