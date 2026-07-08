'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { cssColorConverter } from '@/lib/converters'

const example = 'red-500'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="Material Color Converter" description="Material Color Converter. Free online color converter tool for developers." convertFn={cssColorConverter} exampleInput={example} />
  )
}
