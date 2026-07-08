'use client'

import { useState, useMemo, useCallback } from 'react'
import { useToast } from '@/components/ui/Toast'
import { hexToRgbValues, rgbToHexValues } from '@/lib/converters'

interface ColorReferenceToolProps {
  title: string
  description: string
  referenceType:
    | 'css-named'
    | 'html-named'
    | 'tailwind'
    | 'material'
    | 'bootstrap'
    | 'brands'
    | 'country-flags'
    | 'google'
    | 'apple'
    | 'microsoft'
    | 'discord'
    | 'youtube'
    | 'x-brand'
    | 'instagram'
    | 'spotify'
    | 'netflix'
    | 'fifa'
    | 'nba'
    | 'premier-league'
    | 'national-flags'
    | 'web-safe'
    | 'pantone'
    | 'ral'
    | 'ncs'
    | 'css-search'
    | 'meaning'
    | 'psychological'
    | 'ui-library'
    | 'seasonal'
    | 'trends'
    | 'design-tokens'
    | 'semantic'
    | 'status'
    | 'neutral'
    | 'pastel-library'
}

interface ColorEntry {
  name: string
  hex: string
  category?: string
  description?: string
  shades?: Record<string, string>
}

const CSS_NAMED: ColorEntry[] = [
  { name: 'Alice Blue', hex: '#f0f8ff' },
  { name: 'Antique White', hex: '#faebd7' },
  { name: 'Aqua', hex: '#00ffff' },
  { name: 'Aquamarine', hex: '#7fffd4' },
  { name: 'Azure', hex: '#f0ffff' },
  { name: 'Beige', hex: '#f5f5dc' },
  { name: 'Bisque', hex: '#ffe4c4' },
  { name: 'Black', hex: '#000000' },
  { name: 'Blanched Almond', hex: '#ffebcd' },
  { name: 'Blue', hex: '#0000ff' },
  { name: 'Blue Violet', hex: '#8a2be2' },
  { name: 'Brown', hex: '#a52a2a' },
  { name: 'Burly Wood', hex: '#deb887' },
  { name: 'Cadet Blue', hex: '#5f9ea0' },
  { name: 'Chartreuse', hex: '#7fff00' },
  { name: 'Chocolate', hex: '#d2691e' },
  { name: 'Coral', hex: '#ff7f50' },
  { name: 'Cornflower Blue', hex: '#6495ed' },
  { name: 'Cornsilk', hex: '#fff8dc' },
  { name: 'Crimson', hex: '#dc143c' },
  { name: 'Cyan', hex: '#00ffff' },
  { name: 'Dark Blue', hex: '#00008b' },
  { name: 'Dark Cyan', hex: '#008b8b' },
  { name: 'Dark Goldenrod', hex: '#b8860b' },
  { name: 'Dark Gray', hex: '#a9a9a9' },
  { name: 'Dark Green', hex: '#006400' },
  { name: 'Dark Khaki', hex: '#bdb76b' },
  { name: 'Dark Magenta', hex: '#8b008b' },
  { name: 'Dark Olive Green', hex: '#556b2f' },
  { name: 'Dark Orange', hex: '#ff8c00' },
  { name: 'Dark Orchid', hex: '#9932cc' },
  { name: 'Dark Red', hex: '#8b0000' },
  { name: 'Dark Salmon', hex: '#e9967a' },
  { name: 'Dark Sea Green', hex: '#8fbc8f' },
  { name: 'Dark Slate Blue', hex: '#483d8b' },
  { name: 'Dark Slate Gray', hex: '#2f4f4f' },
  { name: 'Dark Turquoise', hex: '#00ced1' },
  { name: 'Dark Violet', hex: '#9400d3' },
  { name: 'Deep Pink', hex: '#ff1493' },
  { name: 'Deep Sky Blue', hex: '#00bfff' },
  { name: 'Dim Gray', hex: '#696969' },
  { name: 'Dodger Blue', hex: '#1e90ff' },
  { name: 'Firebrick', hex: '#b22222' },
  { name: 'Floral White', hex: '#fffaf0' },
  { name: 'Forest Green', hex: '#228b22' },
  { name: 'Fuchsia', hex: '#ff00ff' },
  { name: 'Gainsboro', hex: '#dcdcdc' },
  { name: 'Ghost White', hex: '#f8f8ff' },
  { name: 'Gold', hex: '#ffd700' },
  { name: 'Goldenrod', hex: '#daa520' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Green', hex: '#008000' },
  { name: 'Green Yellow', hex: '#adff2f' },
  { name: 'Honeydew', hex: '#f0fff0' },
  { name: 'Hot Pink', hex: '#ff69b4' },
  { name: 'Indian Red', hex: '#cd5c5c' },
  { name: 'Indigo', hex: '#4b0082' },
  { name: 'Ivory', hex: '#fffff0' },
  { name: 'Khaki', hex: '#f0e68c' },
  { name: 'Lavender', hex: '#e6e6fa' },
  { name: 'Lavender Blush', hex: '#fff0f5' },
  { name: 'Lawn Green', hex: '#7cfc00' },
  { name: 'Lemon Chiffon', hex: '#fffacd' },
  { name: 'Light Blue', hex: '#add8e6' },
  { name: 'Light Coral', hex: '#f08080' },
  { name: 'Light Cyan', hex: '#e0ffff' },
  { name: 'Light Goldenrod Yellow', hex: '#fafad2' },
  { name: 'Light Gray', hex: '#d3d3d3' },
  { name: 'Light Green', hex: '#90ee90' },
  { name: 'Light Pink', hex: '#ffb6c1' },
  { name: 'Light Salmon', hex: '#ffa07a' },
  { name: 'Light Sea Green', hex: '#20b2aa' },
  { name: 'Light Sky Blue', hex: '#87cefa' },
  { name: 'Light Slate Gray', hex: '#778899' },
  { name: 'Light Steel Blue', hex: '#b0c4de' },
  { name: 'Light Yellow', hex: '#ffffe0' },
  { name: 'Lime', hex: '#00ff00' },
  { name: 'Lime Green', hex: '#32cd32' },
  { name: 'Linen', hex: '#faf0e6' },
  { name: 'Magenta', hex: '#ff00ff' },
  { name: 'Maroon', hex: '#800000' },
  { name: 'Medium Aquamarine', hex: '#66cdaa' },
  { name: 'Medium Blue', hex: '#0000cd' },
  { name: 'Medium Orchid', hex: '#ba55d3' },
  { name: 'Medium Purple', hex: '#9370db' },
  { name: 'Medium Sea Green', hex: '#3cb371' },
  { name: 'Medium Slate Blue', hex: '#7b68ee' },
  { name: 'Medium Spring Green', hex: '#00fa9a' },
  { name: 'Medium Turquoise', hex: '#48d1cc' },
  { name: 'Medium Violet Red', hex: '#c71585' },
  { name: 'Midnight Blue', hex: '#191970' },
  { name: 'Mint Cream', hex: '#f5fffa' },
  { name: 'Misty Rose', hex: '#ffe4e1' },
  { name: 'Moccasin', hex: '#ffe4b5' },
  { name: 'Navajo White', hex: '#ffdead' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Old Lace', hex: '#fdf5e6' },
  { name: 'Olive', hex: '#808000' },
  { name: 'Olive Drab', hex: '#6b8e23' },
  { name: 'Orange', hex: '#ffa500' },
  { name: 'Orange Red', hex: '#ff4500' },
  { name: 'Orchid', hex: '#da70d6' },
  { name: 'Pale Goldenrod', hex: '#eee8aa' },
  { name: 'Pale Green', hex: '#98fb98' },
  { name: 'Pale Turquoise', hex: '#afeeee' },
  { name: 'Pale Violet Red', hex: '#db7093' },
  { name: 'Papaya Whip', hex: '#ffefd5' },
  { name: 'Peach Puff', hex: '#ffdab9' },
  { name: 'Peru', hex: '#cd853f' },
  { name: 'Pink', hex: '#ffc0cb' },
  { name: 'Plum', hex: '#dda0dd' },
  { name: 'Powder Blue', hex: '#b0e0e6' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Rebecca Purple', hex: '#663399' },
  { name: 'Red', hex: '#ff0000' },
  { name: 'Rosy Brown', hex: '#bc8f8f' },
  { name: 'Royal Blue', hex: '#4169e1' },
  { name: 'Saddle Brown', hex: '#8b4513' },
  { name: 'Salmon', hex: '#fa8072' },
  { name: 'Sandy Brown', hex: '#f4a460' },
  { name: 'Sea Green', hex: '#2e8b57' },
  { name: 'Seashell', hex: '#fff5ee' },
  { name: 'Sienna', hex: '#a0522d' },
  { name: 'Silver', hex: '#c0c0c0' },
  { name: 'Sky Blue', hex: '#87ceeb' },
  { name: 'Slate Blue', hex: '#6a5acd' },
  { name: 'Slate Gray', hex: '#708090' },
  { name: 'Snow', hex: '#fffafa' },
  { name: 'Spring Green', hex: '#00ff7f' },
  { name: 'Steel Blue', hex: '#4682b4' },
  { name: 'Tan', hex: '#d2b48c' },
  { name: 'Teal', hex: '#008080' },
  { name: 'Thistle', hex: '#d8bfd8' },
  { name: 'Tomato', hex: '#ff6347' },
  { name: 'Turquoise', hex: '#40e0d0' },
  { name: 'Violet', hex: '#ee82ee' },
  { name: 'Wheat', hex: '#f5deb3' },
  { name: 'White', hex: '#ffffff' },
  { name: 'White Smoke', hex: '#f5f5f5' },
  { name: 'Yellow', hex: '#ffff00' },
  { name: 'Yellow Green', hex: '#9acd32' },
]

const TAILWIND_COLORS: ColorEntry[] = [
  { name: 'Slate 50', hex: '#f8fafc', category: 'Slate' },
  { name: 'Slate 100', hex: '#f1f5f9', category: 'Slate' },
  { name: 'Slate 200', hex: '#e2e8f0', category: 'Slate' },
  { name: 'Slate 300', hex: '#cbd5e1', category: 'Slate' },
  { name: 'Slate 400', hex: '#94a3b8', category: 'Slate' },
  { name: 'Slate 500', hex: '#64748b', category: 'Slate' },
  { name: 'Slate 600', hex: '#475569', category: 'Slate' },
  { name: 'Slate 700', hex: '#334155', category: 'Slate' },
  { name: 'Slate 800', hex: '#1e293b', category: 'Slate' },
  { name: 'Slate 900', hex: '#0f172a', category: 'Slate' },
  { name: 'Slate 950', hex: '#020617', category: 'Slate' },
  { name: 'Gray 50', hex: '#f9fafb', category: 'Gray' },
  { name: 'Gray 100', hex: '#f3f4f6', category: 'Gray' },
  { name: 'Gray 200', hex: '#e5e7eb', category: 'Gray' },
  { name: 'Gray 300', hex: '#d1d5db', category: 'Gray' },
  { name: 'Gray 400', hex: '#9ca3af', category: 'Gray' },
  { name: 'Gray 500', hex: '#6b7280', category: 'Gray' },
  { name: 'Gray 600', hex: '#4b5563', category: 'Gray' },
  { name: 'Gray 700', hex: '#374151', category: 'Gray' },
  { name: 'Gray 800', hex: '#1f2937', category: 'Gray' },
  { name: 'Gray 900', hex: '#111827', category: 'Gray' },
  { name: 'Gray 950', hex: '#030712', category: 'Gray' },
  { name: 'Zinc 50', hex: '#fafafa', category: 'Zinc' },
  { name: 'Zinc 100', hex: '#f4f4f5', category: 'Zinc' },
  { name: 'Zinc 200', hex: '#e4e4e7', category: 'Zinc' },
  { name: 'Zinc 300', hex: '#d4d4d8', category: 'Zinc' },
  { name: 'Zinc 400', hex: '#a1a1aa', category: 'Zinc' },
  { name: 'Zinc 500', hex: '#71717a', category: 'Zinc' },
  { name: 'Zinc 600', hex: '#52525b', category: 'Zinc' },
  { name: 'Zinc 700', hex: '#3f3f46', category: 'Zinc' },
  { name: 'Zinc 800', hex: '#27272a', category: 'Zinc' },
  { name: 'Zinc 900', hex: '#18181b', category: 'Zinc' },
  { name: 'Zinc 950', hex: '#09090b', category: 'Zinc' },
  { name: 'Neutral 50', hex: '#fafafa', category: 'Neutral' },
  { name: 'Neutral 100', hex: '#f5f5f5', category: 'Neutral' },
  { name: 'Neutral 200', hex: '#e5e5e5', category: 'Neutral' },
  { name: 'Neutral 300', hex: '#d4d4d4', category: 'Neutral' },
  { name: 'Neutral 400', hex: '#a3a3a3', category: 'Neutral' },
  { name: 'Neutral 500', hex: '#737373', category: 'Neutral' },
  { name: 'Neutral 600', hex: '#525252', category: 'Neutral' },
  { name: 'Neutral 700', hex: '#404040', category: 'Neutral' },
  { name: 'Neutral 800', hex: '#262626', category: 'Neutral' },
  { name: 'Neutral 900', hex: '#171717', category: 'Neutral' },
  { name: 'Neutral 950', hex: '#0a0a0a', category: 'Neutral' },
  { name: 'Red 50', hex: '#fef2f2', category: 'Red' },
  { name: 'Red 100', hex: '#fee2e2', category: 'Red' },
  { name: 'Red 200', hex: '#fecaca', category: 'Red' },
  { name: 'Red 300', hex: '#fca5a5', category: 'Red' },
  { name: 'Red 400', hex: '#f87171', category: 'Red' },
  { name: 'Red 500', hex: '#ef4444', category: 'Red' },
  { name: 'Red 600', hex: '#dc2626', category: 'Red' },
  { name: 'Red 700', hex: '#b91c1c', category: 'Red' },
  { name: 'Red 800', hex: '#991b1b', category: 'Red' },
  { name: 'Red 900', hex: '#7f1d1d', category: 'Red' },
  { name: 'Red 950', hex: '#450a0a', category: 'Red' },
  { name: 'Orange 50', hex: '#fff7ed', category: 'Orange' },
  { name: 'Orange 100', hex: '#ffedd5', category: 'Orange' },
  { name: 'Orange 200', hex: '#fed7aa', category: 'Orange' },
  { name: 'Orange 300', hex: '#fdba74', category: 'Orange' },
  { name: 'Orange 400', hex: '#fb923c', category: 'Orange' },
  { name: 'Orange 500', hex: '#f97316', category: 'Orange' },
  { name: 'Orange 600', hex: '#ea580c', category: 'Orange' },
  { name: 'Orange 700', hex: '#c2410c', category: 'Orange' },
  { name: 'Orange 800', hex: '#9a3412', category: 'Orange' },
  { name: 'Orange 900', hex: '#7c2d12', category: 'Orange' },
  { name: 'Orange 950', hex: '#431407', category: 'Orange' },
  { name: 'Amber 50', hex: '#fffbeb', category: 'Amber' },
  { name: 'Amber 100', hex: '#fef3c7', category: 'Amber' },
  { name: 'Amber 200', hex: '#fde68a', category: 'Amber' },
  { name: 'Amber 300', hex: '#fcd34d', category: 'Amber' },
  { name: 'Amber 400', hex: '#fbbf24', category: 'Amber' },
  { name: 'Amber 500', hex: '#f59e0b', category: 'Amber' },
  { name: 'Amber 600', hex: '#d97706', category: 'Amber' },
  { name: 'Amber 700', hex: '#b45309', category: 'Amber' },
  { name: 'Amber 800', hex: '#92400e', category: 'Amber' },
  { name: 'Amber 900', hex: '#78350f', category: 'Amber' },
  { name: 'Amber 950', hex: '#451a03', category: 'Amber' },
  { name: 'Yellow 50', hex: '#fefce8', category: 'Yellow' },
  { name: 'Yellow 100', hex: '#fef9c3', category: 'Yellow' },
  { name: 'Yellow 200', hex: '#fef08a', category: 'Yellow' },
  { name: 'Yellow 300', hex: '#fde047', category: 'Yellow' },
  { name: 'Yellow 400', hex: '#facc15', category: 'Yellow' },
  { name: 'Yellow 500', hex: '#eab308', category: 'Yellow' },
  { name: 'Yellow 600', hex: '#ca8a04', category: 'Yellow' },
  { name: 'Yellow 700', hex: '#a16207', category: 'Yellow' },
  { name: 'Yellow 800', hex: '#854d0e', category: 'Yellow' },
  { name: 'Yellow 900', hex: '#713f12', category: 'Yellow' },
  { name: 'Yellow 950', hex: '#422006', category: 'Yellow' },
  { name: 'Lime 50', hex: '#f7fee7', category: 'Lime' },
  { name: 'Lime 100', hex: '#ecfccb', category: 'Lime' },
  { name: 'Lime 200', hex: '#d9f99d', category: 'Lime' },
  { name: 'Lime 300', hex: '#bef264', category: 'Lime' },
  { name: 'Lime 400', hex: '#a3e635', category: 'Lime' },
  { name: 'Lime 500', hex: '#84cc16', category: 'Lime' },
  { name: 'Lime 600', hex: '#65a30d', category: 'Lime' },
  { name: 'Lime 700', hex: '#4d7c0f', category: 'Lime' },
  { name: 'Lime 800', hex: '#3f6212', category: 'Lime' },
  { name: 'Lime 900', hex: '#365314', category: 'Lime' },
  { name: 'Lime 950', hex: '#1a2e05', category: 'Lime' },
  { name: 'Green 50', hex: '#f0fdf4', category: 'Green' },
  { name: 'Green 100', hex: '#dcfce7', category: 'Green' },
  { name: 'Green 200', hex: '#bbf7d0', category: 'Green' },
  { name: 'Green 300', hex: '#86efac', category: 'Green' },
  { name: 'Green 400', hex: '#4ade80', category: 'Green' },
  { name: 'Green 500', hex: '#22c55e', category: 'Green' },
  { name: 'Green 600', hex: '#16a34a', category: 'Green' },
  { name: 'Green 700', hex: '#15803d', category: 'Green' },
  { name: 'Green 800', hex: '#166534', category: 'Green' },
  { name: 'Green 900', hex: '#14532d', category: 'Green' },
  { name: 'Green 950', hex: '#052e16', category: 'Green' },
  { name: 'Emerald 50', hex: '#ecfdf5', category: 'Emerald' },
  { name: 'Emerald 100', hex: '#d1fae5', category: 'Emerald' },
  { name: 'Emerald 200', hex: '#a7f3d0', category: 'Emerald' },
  { name: 'Emerald 300', hex: '#6ee7b7', category: 'Emerald' },
  { name: 'Emerald 400', hex: '#34d399', category: 'Emerald' },
  { name: 'Emerald 500', hex: '#10b981', category: 'Emerald' },
  { name: 'Emerald 600', hex: '#059669', category: 'Emerald' },
  { name: 'Emerald 700', hex: '#047857', category: 'Emerald' },
  { name: 'Emerald 800', hex: '#065f46', category: 'Emerald' },
  { name: 'Emerald 900', hex: '#064e3b', category: 'Emerald' },
  { name: 'Emerald 950', hex: '#022c22', category: 'Emerald' },
  { name: 'Teal 50', hex: '#f0fdfa', category: 'Teal' },
  { name: 'Teal 100', hex: '#ccfbf1', category: 'Teal' },
  { name: 'Teal 200', hex: '#99f6e4', category: 'Teal' },
  { name: 'Teal 300', hex: '#5eead4', category: 'Teal' },
  { name: 'Teal 400', hex: '#2dd4bf', category: 'Teal' },
  { name: 'Teal 500', hex: '#14b8a6', category: 'Teal' },
  { name: 'Teal 600', hex: '#0d9488', category: 'Teal' },
  { name: 'Teal 700', hex: '#0f766e', category: 'Teal' },
  { name: 'Teal 800', hex: '#115e59', category: 'Teal' },
  { name: 'Teal 900', hex: '#134e4a', category: 'Teal' },
  { name: 'Teal 950', hex: '#042f2e', category: 'Teal' },
  { name: 'Cyan 50', hex: '#ecfeff', category: 'Cyan' },
  { name: 'Cyan 100', hex: '#cffafe', category: 'Cyan' },
  { name: 'Cyan 200', hex: '#a5f3fc', category: 'Cyan' },
  { name: 'Cyan 300', hex: '#67e8f9', category: 'Cyan' },
  { name: 'Cyan 400', hex: '#22d3ee', category: 'Cyan' },
  { name: 'Cyan 500', hex: '#06b6d4', category: 'Cyan' },
  { name: 'Cyan 600', hex: '#0891b2', category: 'Cyan' },
  { name: 'Cyan 700', hex: '#0e7490', category: 'Cyan' },
  { name: 'Cyan 800', hex: '#155e75', category: 'Cyan' },
  { name: 'Cyan 900', hex: '#164e63', category: 'Cyan' },
  { name: 'Cyan 950', hex: '#083344', category: 'Cyan' },
  { name: 'Sky 50', hex: '#f0f9ff', category: 'Sky' },
  { name: 'Sky 100', hex: '#e0f2fe', category: 'Sky' },
  { name: 'Sky 200', hex: '#bae6fd', category: 'Sky' },
  { name: 'Sky 300', hex: '#7dd3fc', category: 'Sky' },
  { name: 'Sky 400', hex: '#38bdf8', category: 'Sky' },
  { name: 'Sky 500', hex: '#0ea5e9', category: 'Sky' },
  { name: 'Sky 600', hex: '#0284c7', category: 'Sky' },
  { name: 'Sky 700', hex: '#0369a1', category: 'Sky' },
  { name: 'Sky 800', hex: '#075985', category: 'Sky' },
  { name: 'Sky 900', hex: '#0c4a6e', category: 'Sky' },
  { name: 'Sky 950', hex: '#082f49', category: 'Sky' },
  { name: 'Blue 50', hex: '#eff6ff', category: 'Blue' },
  { name: 'Blue 100', hex: '#dbeafe', category: 'Blue' },
  { name: 'Blue 200', hex: '#bfdbfe', category: 'Blue' },
  { name: 'Blue 300', hex: '#93c5fd', category: 'Blue' },
  { name: 'Blue 400', hex: '#60a5fa', category: 'Blue' },
  { name: 'Blue 500', hex: '#3b82f6', category: 'Blue' },
  { name: 'Blue 600', hex: '#2563eb', category: 'Blue' },
  { name: 'Blue 700', hex: '#1d4ed8', category: 'Blue' },
  { name: 'Blue 800', hex: '#1e40af', category: 'Blue' },
  { name: 'Blue 900', hex: '#1e3a8a', category: 'Blue' },
  { name: 'Blue 950', hex: '#172554', category: 'Blue' },
  { name: 'Indigo 50', hex: '#eef2ff', category: 'Indigo' },
  { name: 'Indigo 100', hex: '#e0e7ff', category: 'Indigo' },
  { name: 'Indigo 200', hex: '#c7d2fe', category: 'Indigo' },
  { name: 'Indigo 300', hex: '#a5b4fc', category: 'Indigo' },
  { name: 'Indigo 400', hex: '#818cf8', category: 'Indigo' },
  { name: 'Indigo 500', hex: '#6366f1', category: 'Indigo' },
  { name: 'Indigo 600', hex: '#4f46e5', category: 'Indigo' },
  { name: 'Indigo 700', hex: '#4338ca', category: 'Indigo' },
  { name: 'Indigo 800', hex: '#3730a3', category: 'Indigo' },
  { name: 'Indigo 900', hex: '#312e81', category: 'Indigo' },
  { name: 'Indigo 950', hex: '#1e1b4b', category: 'Indigo' },
  { name: 'Violet 50', hex: '#f5f3ff', category: 'Violet' },
  { name: 'Violet 100', hex: '#ede9fe', category: 'Violet' },
  { name: 'Violet 200', hex: '#ddd6fe', category: 'Violet' },
  { name: 'Violet 300', hex: '#c4b5fd', category: 'Violet' },
  { name: 'Violet 400', hex: '#a78bfa', category: 'Violet' },
  { name: 'Violet 500', hex: '#8b5cf6', category: 'Violet' },
  { name: 'Violet 600', hex: '#7c3aed', category: 'Violet' },
  { name: 'Violet 700', hex: '#6d28d9', category: 'Violet' },
  { name: 'Violet 800', hex: '#5b21b6', category: 'Violet' },
  { name: 'Violet 900', hex: '#4c1d95', category: 'Violet' },
  { name: 'Violet 950', hex: '#2e1065', category: 'Violet' },
  { name: 'Purple 50', hex: '#faf5ff', category: 'Purple' },
  { name: 'Purple 100', hex: '#f3e8ff', category: 'Purple' },
  { name: 'Purple 200', hex: '#e9d5ff', category: 'Purple' },
  { name: 'Purple 300', hex: '#d8b4fe', category: 'Purple' },
  { name: 'Purple 400', hex: '#c084fc', category: 'Purple' },
  { name: 'Purple 500', hex: '#a855f7', category: 'Purple' },
  { name: 'Purple 600', hex: '#9333ea', category: 'Purple' },
  { name: 'Purple 700', hex: '#7e22ce', category: 'Purple' },
  { name: 'Purple 800', hex: '#6b21a8', category: 'Purple' },
  { name: 'Purple 900', hex: '#581c87', category: 'Purple' },
  { name: 'Purple 950', hex: '#3b0764', category: 'Purple' },
  { name: 'Fuchsia 50', hex: '#fdf4ff', category: 'Fuchsia' },
  { name: 'Fuchsia 100', hex: '#fae8ff', category: 'Fuchsia' },
  { name: 'Fuchsia 200', hex: '#f5d0fe', category: 'Fuchsia' },
  { name: 'Fuchsia 300', hex: '#f0abfc', category: 'Fuchsia' },
  { name: 'Fuchsia 400', hex: '#e879f9', category: 'Fuchsia' },
  { name: 'Fuchsia 500', hex: '#d946ef', category: 'Fuchsia' },
  { name: 'Fuchsia 600', hex: '#c026d3', category: 'Fuchsia' },
  { name: 'Fuchsia 700', hex: '#a21caf', category: 'Fuchsia' },
  { name: 'Fuchsia 800', hex: '#86198f', category: 'Fuchsia' },
  { name: 'Fuchsia 900', hex: '#701a75', category: 'Fuchsia' },
  { name: 'Fuchsia 950', hex: '#4a044e', category: 'Fuchsia' },
  { name: 'Pink 50', hex: '#fdf2f8', category: 'Pink' },
  { name: 'Pink 100', hex: '#fce7f3', category: 'Pink' },
  { name: 'Pink 200', hex: '#fbcfe8', category: 'Pink' },
  { name: 'Pink 300', hex: '#f9a8d4', category: 'Pink' },
  { name: 'Pink 400', hex: '#f472b6', category: 'Pink' },
  { name: 'Pink 500', hex: '#ec4899', category: 'Pink' },
  { name: 'Pink 600', hex: '#db2777', category: 'Pink' },
  { name: 'Pink 700', hex: '#be185d', category: 'Pink' },
  { name: 'Pink 800', hex: '#9d174d', category: 'Pink' },
  { name: 'Pink 900', hex: '#831843', category: 'Pink' },
  { name: 'Pink 950', hex: '#500724', category: 'Pink' },
  { name: 'Rose 50', hex: '#fff1f2', category: 'Rose' },
  { name: 'Rose 100', hex: '#ffe4e6', category: 'Rose' },
  { name: 'Rose 200', hex: '#fecdd3', category: 'Rose' },
  { name: 'Rose 300', hex: '#fda4af', category: 'Rose' },
  { name: 'Rose 400', hex: '#fb7185', category: 'Rose' },
  { name: 'Rose 500', hex: '#f43f5e', category: 'Rose' },
  { name: 'Rose 600', hex: '#e11d48', category: 'Rose' },
  { name: 'Rose 700', hex: '#be123c', category: 'Rose' },
  { name: 'Rose 800', hex: '#9f1239', category: 'Rose' },
  { name: 'Rose 900', hex: '#881337', category: 'Rose' },
  { name: 'Rose 950', hex: '#4c0519', category: 'Rose' },
]

const BRAND_COLORS: ColorEntry[] = [
  { name: 'Google', hex: '#4285F4', category: 'Tech' },
  { name: 'Google Red', hex: '#EA4335', category: 'Tech' },
  { name: 'Google Yellow', hex: '#FBBC05', category: 'Tech' },
  { name: 'Google Green', hex: '#34A853', category: 'Tech' },
  { name: 'Facebook', hex: '#1877F2', category: 'Social' },
  { name: 'Twitter / X', hex: '#000000', category: 'Social' },
  { name: 'Instagram', hex: '#E4405F', category: 'Social' },
  { name: 'Instagram Purple', hex: '#833AB4', category: 'Social' },
  { name: 'Instagram Yellow', hex: '#FDCB6E', category: 'Social' },
  { name: 'LinkedIn', hex: '#0A66C2', category: 'Social' },
  { name: 'YouTube', hex: '#FF0000', category: 'Social' },
  { name: 'Discord', hex: '#5865F2', category: 'Social' },
  { name: 'Slack', hex: '#4A154B', category: 'Social' },
  { name: 'Slack Green', hex: '#36C5F0', category: 'Social' },
  { name: 'Slack Yellow', hex: '#ECB22E', category: 'Social' },
  { name: 'Slack Red', hex: '#E01E5A', category: 'Social' },
  { name: 'GitHub', hex: '#181717', category: 'Tech' },
  { name: 'GitLab', hex: '#FC6D26', category: 'Tech' },
  { name: 'Bitbucket', hex: '#0052CC', category: 'Tech' },
  { name: 'Apple', hex: '#555555', category: 'Tech' },
  { name: 'Apple Blue', hex: '#007AFF', category: 'Tech' },
  { name: 'Apple Green', hex: '#34C759', category: 'Tech' },
  { name: 'Apple Red', hex: '#FF3B30', category: 'Tech' },
  { name: 'Microsoft', hex: '#00A4EF', category: 'Tech' },
  { name: 'Microsoft Red', hex: '#F25022', category: 'Tech' },
  { name: 'Microsoft Green', hex: '#7FBA00', category: 'Tech' },
  { name: 'Microsoft Yellow', hex: '#FFB900', category: 'Tech' },
  { name: 'Amazon', hex: '#FF9900', category: 'E-commerce' },
  { name: 'Netflix', hex: '#E50914', category: 'Entertainment' },
  { name: 'Spotify', hex: '#1DB954', category: 'Entertainment' },
  { name: 'Twitch', hex: '#9146FF', category: 'Entertainment' },
  { name: 'Pinterest', hex: '#BD081C', category: 'Social' },
  { name: 'Snapchat', hex: '#FFFC00', category: 'Social' },
  { name: 'TikTok', hex: '#000000', category: 'Social' },
  { name: 'TikTok Cyan', hex: '#25F4EE', category: 'Social' },
  { name: 'TikTok Red', hex: '#FE2C55', category: 'Social' },
  { name: 'WhatsApp', hex: '#25D366', category: 'Social' },
  { name: 'Telegram', hex: '#26A5E4', category: 'Social' },
  { name: 'Reddit', hex: '#FF4500', category: 'Social' },
  { name: 'Medium', hex: '#000000', category: 'Social' },
  { name: 'Dribbble', hex: '#EA4C89', category: 'Design' },
  { name: 'Behance', hex: '#1769FF', category: 'Design' },
  { name: 'Figma', hex: '#F24E1E', category: 'Design' },
  { name: 'Figma Purple', hex: '#A259FF', category: 'Design' },
  { name: 'Figma Teal', hex: '#1ABC9C', category: 'Design' },
  { name: 'Adobe', hex: '#FF0000', category: 'Design' },
  { name: 'Canva', hex: '#00C4CC', category: 'Design' },
  { name: 'Shopify', hex: '#7AB55C', category: 'E-commerce' },
  { name: 'Shopify Green', hex: '#96BF48', category: 'E-commerce' },
  { name: 'Shopify Black', hex: '#212326', category: 'E-commerce' },
  { name: 'Stripe', hex: '#635BFF', category: 'Finance' },
  { name: 'PayPal', hex: '#003087', category: 'Finance' },
  { name: 'PayPal Blue', hex: '#009CDE', category: 'Finance' },
  { name: 'Square', hex: '#3E4348', category: 'Finance' },
  { name: 'Uber', hex: '#000000', category: 'Transport' },
  { name: 'Lyft', hex: '#FF00BF', category: 'Transport' },
  { name: 'Airbnb', hex: '#FF5A5F', category: 'Travel' },
  { name: 'Booking', hex: '#003580', category: 'Travel' },
  { name: 'TripAdvisor', hex: '#34E0A1', category: 'Travel' },
  { name: 'Nike', hex: '#111111', category: 'Sports' },
  { name: 'Adidas', hex: '#000000', category: 'Sports' },
  { name: 'Puma', hex: '#FFB300', category: 'Sports' },
  { name: 'Coca Cola', hex: '#F40000', category: 'Food' },
  { name: 'Pepsi', hex: '#0065A3', category: 'Food' },
  { name: 'Mcdonalds', hex: '#F8C301', category: 'Food' },
  { name: 'Starbucks', hex: '#006241', category: 'Food' },
  { name: 'Burger King', hex: '#F5A623', category: 'Food' },
  { name: 'KFC', hex: '#E4002B', category: 'Food' },
  { name: 'IBM', hex: '#006699', category: 'Tech' },
  { name: 'Intel', hex: '#0071C5', category: 'Tech' },
  { name: 'Nvidia', hex: '#76B900', category: 'Tech' },
  { name: 'AMD', hex: '#ED1C24', category: 'Tech' },
  { name: 'Samsung', hex: '#1428A0', category: 'Tech' },
  { name: 'Sony', hex: '#000000', category: 'Tech' },
  { name: 'LG', hex: '#A50034', category: 'Tech' },
  { name: 'Mozilla', hex: '#000000', category: 'Tech' },
  { name: 'Wikipedia', hex: '#000000', category: 'Tech' },
  { name: 'Yahoo', hex: '#6001D2', category: 'Tech' },
  { name: 'Bing', hex: '#008373', category: 'Tech' },
  { name: 'DuckDuckGo', hex: '#DE5833', category: 'Tech' },
  { name: 'Stack Overflow', hex: '#F58025', category: 'Tech' },
  { name: 'npm', hex: '#CB3837', category: 'Tech' },
  { name: 'Yarn', hex: '#2C8EBB', category: 'Tech' },
  { name: 'Vue', hex: '#4FC08D', category: 'Tech' },
  { name: 'React', hex: '#61DAFB', category: 'Tech' },
  { name: 'Angular', hex: '#DD0031', category: 'Tech' },
  { name: 'Svelte', hex: '#FF3E00', category: 'Tech' },
  { name: 'Tailwind CSS', hex: '#06B6D4', category: 'Tech' },
  { name: 'Bootstrap', hex: '#7952B3', category: 'Tech' },
  { name: 'Node.js', hex: '#339933', category: 'Tech' },
  { name: 'Deno', hex: '#000000', category: 'Tech' },
  { name: 'Python', hex: '#3776AB', category: 'Tech' },
  { name: 'Ruby', hex: '#CC342D', category: 'Tech' },
  { name: 'PHP', hex: '#777BB4', category: 'Tech' },
  { name: 'Java', hex: '#007396', category: 'Tech' },
  { name: 'Kotlin', hex: '#7F52FF', category: 'Tech' },
  { name: 'Swift', hex: '#F05138', category: 'Tech' },
  { name: 'Rust', hex: '#000000', category: 'Tech' },
  { name: 'Go', hex: '#00ADD8', category: 'Tech' },
  { name: 'TypeScript', hex: '#3178C6', category: 'Tech' },
  { name: 'JavaScript', hex: '#F7DF1E', category: 'Tech' },
  { name: 'CSS3', hex: '#1572B6', category: 'Tech' },
  { name: 'HTML5', hex: '#E34F26', category: 'Tech' },
  { name: 'ESPN', hex: '#D00', category: 'Sports' },
  { name: 'NBC', hex: '#007BFF', category: 'Media' },
  { name: 'BBC', hex: '#000000', category: 'Media' },
  { name: 'CNN', hex: '#CC0000', category: 'Media' },
  { name: 'NY Times', hex: '#000000', category: 'Media' },
  { name: 'Guardian', hex: '#052962', category: 'Media' },
  { name: 'Forbes', hex: '#00A8FF', category: 'Media' },
  { name: 'Bloomberg', hex: '#000000', category: 'Media' },
  { name: 'Tesla', hex: '#CC0000', category: 'Transport' },
  { name: 'SpaceX', hex: '#000000', category: 'Tech' },
  { name: 'LEGO', hex: '#F6C700', category: 'Entertainment' },
  { name: 'Disney', hex: '#1134A6', category: 'Entertainment' },
  { name: 'Pixar', hex: '#000000', category: 'Entertainment' },
  { name: 'HBO', hex: '#000000', category: 'Entertainment' },
  { name: 'Hulu', hex: '#1CE783', category: 'Entertainment' },
  { name: 'Prime Video', hex: '#00A8E1', category: 'Entertainment' },
  { name: 'NBA', hex: '#C9082A', category: 'Sports' },
  { name: 'NFL', hex: '#013369', category: 'Sports' },
  { name: 'MLB', hex: '#002D72', category: 'Sports' },
  { name: 'NHL', hex: '#000000', category: 'Sports' },
  { name: 'FIFA', hex: '#326295', category: 'Sports' },
  { name: 'UEFA', hex: '#003399', category: 'Sports' },
  { name: 'Premier League', hex: '#360066', category: 'Sports' },
  { name: 'La Liga', hex: '#E30613', category: 'Sports' },
  { name: 'Serie A', hex: '#004B87', category: 'Sports' },
  { name: 'Bundesliga', hex: '#D2051E', category: 'Sports' },
  { name: 'Formula 1', hex: '#E10600', category: 'Sports' },
  { name: 'UFC', hex: '#D20A0A', category: 'Sports' },
]

const COLOR_MEANINGS: ColorEntry[] = [
  { name: 'Red', hex: '#FF0000', description: 'Energy, passion, danger, excitement, love, strength' },
  { name: 'Blue', hex: '#0000FF', description: 'Trust, loyalty, wisdom, confidence, intelligence, calm' },
  { name: 'Green', hex: '#00FF00', description: 'Nature, growth, harmony, freshness, safety, environment' },
  { name: 'Yellow', hex: '#FFFF00', description: 'Happiness, optimism, warmth, creativity, energy, joy' },
  { name: 'Orange', hex: '#FFA500', description: 'Enthusiasm, creativity, warmth, success, encouragement' },
  { name: 'Purple', hex: '#800080', description: 'Royalty, luxury, mystery, spirituality, creativity' },
  { name: 'Pink', hex: '#FFC0CB', description: 'Love, kindness, femininity, playfulness, compassion' },
  { name: 'Brown', hex: '#A52A2A', description: 'Stability, reliability, earth, comfort, security' },
  { name: 'Black', hex: '#000000', description: 'Power, elegance, sophistication, mystery, authority' },
  { name: 'White', hex: '#FFFFFF', description: 'Purity, cleanliness, simplicity, innocence, goodness' },
  { name: 'Gray', hex: '#808080', description: 'Neutrality, balance, sophistication, professionalism' },
  { name: 'Gold', hex: '#FFD700', description: 'Wealth, success, prestige, luxury, prosperity' },
  { name: 'Silver', hex: '#C0C0C0', description: 'Modernity, elegance, prestige, technology, sleekness' },
  { name: 'Teal', hex: '#008080', description: 'Sophistication, tranquility, healing, renewal' },
  { name: 'Indigo', hex: '#4B0082', description: 'Intuition, wisdom, spirituality, depth, perception' },
  { name: 'Coral', hex: '#FF7F50', description: 'Vitality, warmth, enthusiasm, confidence, desire' },
  { name: 'Turquoise', hex: '#40E0D0', description: 'Calm, clarity, healing, creativity, tropical' },
  { name: 'Lavender', hex: '#E6E6FA', description: 'Calmness, serenity, grace, elegance, femininity' },
  { name: 'Maroon', hex: '#800000', description: 'Control, responsibility, sophistication, intensity' },
  { name: 'Navy', hex: '#000080', description: 'Authority, depth, stability, confidence, trust' },
  { name: 'Olive', hex: '#808000', description: 'Peace, harmony, nature, wisdom, traditional' },
  { name: 'Peach', hex: '#FFDAB9', description: 'Warmth, friendliness, gentleness, sincerity' },
  { name: 'Mint', hex: '#98FB98', description: 'Freshness, vitality, renewal, calmness, nature' },
  { name: 'Cream', hex: '#FFFDD0', description: 'Elegance, calm, softness, sophistication, warmth' },
]

const WEB_SAFE_COLORS: ColorEntry[] = (() => {
  const colors: ColorEntry[] = []
  for (let r = 0; r <= 255; r += 51) {
    for (let g = 0; g <= 255; g += 51) {
      for (let b = 0; b <= 255; b += 51) {
        const hex = rgbToHexValues(r, g, b)
        const name = `${r},${g},${b}`
        colors.push({ name, hex })
      }
    }
  }
  return colors
})()

const PASTEL_COLORS: ColorEntry[] = [
  { name: 'Pastel Pink', hex: '#FFB6C1', category: 'Pink' },
  { name: 'Pastel Rose', hex: '#FFD1DC', category: 'Pink' },
  { name: 'Pastel Coral', hex: '#FEC8CD', category: 'Pink' },
  { name: 'Pastel Salmon', hex: '#FDA1A1', category: 'Pink' },
  { name: 'Pastel Peach', hex: '#FFDAB9', category: 'Orange' },
  { name: 'Pastel Apricot', hex: '#FDD5B1', category: 'Orange' },
  { name: 'Pastel Melon', hex: '#FEE2B5', category: 'Orange' },
  { name: 'Pastel Yellow', hex: '#FFFACD', category: 'Yellow' },
  { name: 'Pastel Lime', hex: '#EAF4C7', category: 'Green' },
  { name: 'Pastel Mint', hex: '#B2FBA5', category: 'Green' },
  { name: 'Pastel Sage', hex: '#C1E1C1', category: 'Green' },
  { name: 'Pastel Seafoam', hex: '#A7E6D8', category: 'Green' },
  { name: 'Pastel Mint Cream', hex: '#C4E6D8', category: 'Green' },
  { name: 'Pastel Aqua', hex: '#B4D8E7', category: 'Blue' },
  { name: 'Pastel Sky', hex: '#AEC6E4', category: 'Blue' },
  { name: 'Pastel Baby Blue', hex: '#B5D8F7', category: 'Blue' },
  { name: 'Pastel Periwinkle', hex: '#C8C8F0', category: 'Blue' },
  { name: 'Pastel Lavender', hex: '#D8B4E2', category: 'Purple' },
  { name: 'Pastel Lilac', hex: '#C8A2C8', category: 'Purple' },
  { name: 'Pastel Mauve', hex: '#E0B0FF', category: 'Purple' },
  { name: 'Pastel Orchid', hex: '#DDA0DD', category: 'Purple' },
  { name: 'Pastel Gray', hex: '#CFCFC4', category: 'Neutral' },
  { name: 'Pastel Ivory', hex: '#FFFFF0', category: 'Neutral' },
  { name: 'Pastel Cream', hex: '#FFFDD0', category: 'Neutral' },
  { name: 'Pastel Beige', hex: '#F5F5DC', category: 'Neutral' },
]

function getCategoryColors(colors: ColorEntry[]): string[] {
  const cats = new Set<string>()
  for (const c of colors) if (c.category) cats.add(c.category)
  return Array.from(cats).sort()
}

export default function ColorReferenceTool({ title, description, referenceType }: ColorReferenceToolProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const [copiedId, setCopiedId] = useState('')
  const { addToast } = useToast()

  const allColors = useMemo(() => {
    switch (referenceType) {
      case 'css-named':
      case 'html-named':
      case 'css-search': return CSS_NAMED
      case 'tailwind': return TAILWIND_COLORS
      case 'brands':
      case 'google':
      case 'apple':
      case 'microsoft':
      case 'discord':
      case 'youtube':
      case 'x-brand':
      case 'instagram':
      case 'spotify':
      case 'netflix':
      case 'fifa':
      case 'nba':
      case 'premier-league': return BRAND_COLORS
      case 'meaning':
      case 'psychological': return COLOR_MEANINGS
      case 'web-safe': return WEB_SAFE_COLORS
      case 'pastel-library': return PASTEL_COLORS
      default: return CSS_NAMED
    }
  }, [referenceType])

  const categories = useMemo(() => getCategoryColors(allColors), [allColors])

  const filtered = useMemo(() => {
    let result = allColors
    if (activeCategory && categories.includes(activeCategory)) {
      result = result.filter(c => c.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.hex.toLowerCase().includes(q))
    }
    return result
  }, [allColors, activeCategory, categories, search])

  const handleCopy = useCallback(async (hex: string, name: string) => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopiedId(hex)
      addToast(`Copied ${hex}`, 'success')
      setTimeout(() => setCopiedId(''), 1500)
    } catch {
      addToast('Failed to copy', 'error')
    }
  }, [addToast])

  const isMeaning = referenceType === 'meaning' || referenceType === 'psychological'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-7xl">{description}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${allColors.length} colors...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all"
          />
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500 self-center whitespace-nowrap">
          {filtered.length} of {allColors.length}
        </span>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory('')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              !activeCategory
                ? 'bg-rose-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === activeCategory ? '' : cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                cat === activeCategory
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
        {filtered.map((entry) => (
          <button
            key={entry.hex + entry.name}
            onClick={() => handleCopy(entry.hex, entry.name)}
            className="group relative flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-md hover:border-rose-300 dark:hover:border-rose-700 transition-all duration-200 text-left"
          >
            <div
              className="w-full h-12 rounded-lg border border-slate-100 dark:border-slate-700"
              style={{ backgroundColor: entry.hex }}
            />
            <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 truncate w-full text-center leading-tight">
              {entry.name}
            </span>
            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">{entry.hex}</span>
            {isMeaning && entry.description && (
              <span className="text-[8px] text-slate-400 dark:text-slate-500 text-center leading-tight mt-0.5 line-clamp-2">
                {entry.description}
              </span>
            )}
            {copiedId === entry.hex && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400 dark:text-slate-500">
          <svg className="w-12 h-12 mx-auto mb-3 text-slate-200 dark:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">No colors match your search</p>
        </div>
      )}
    </div>
  )
}
