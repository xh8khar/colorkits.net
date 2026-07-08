'use client'
import ContrastCheckerTool from '@/components/tools/ContrastCheckerTool'

export default function ToolPageClient() {
  return (
    <ContrastCheckerTool title="WCAG Contrast Checker" description="WCAG Contrast Checker. Free online color tool for developers and designers." checkerType="wcag" />
  )
}
