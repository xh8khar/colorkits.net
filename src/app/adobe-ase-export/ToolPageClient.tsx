'use client'
import ToolLayout from '@/components/tools/ToolLayout'
import { colorName } from '@/lib/converters'

const example = '#ff0044'

export default function ToolPageClient() {
  return (
    <ToolLayout
      title="Adobe ASE Export"
      description="Export color palettes as Adobe Swatch Exchange (.ase) files."
      onConvert={colorName}
      exampleInput={example}
      colorPreview="#ff0044"
    />
  )
}
