'use client'
import ColorConverterTool from '@/components/tools/ColorConverterTool'
import { cssColorConverter } from '@/lib/converters'

const example = 'slate-500'

export default function ToolPageClient() {
  return (
    <ColorConverterTool title="Tailwind Color Converter" description="Tailwind Color Converter. Free online color converter tool for developers." convertFn={cssColorConverter} exampleInput={example} />
  )
}
