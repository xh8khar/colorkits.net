import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Converters</h3>
            <ul className="space-y-2">
              <li><Link href="/hex-to-rgb" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">HEX to RGB</Link></li>
              <li><Link href="/rgb-to-hex" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">RGB to HEX</Link></li>
              <li><Link href="/hex-to-hsl" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">HEX to HSL</Link></li>
              <li><Link href="/hsl-to-hex" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">HSL to HEX</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Palettes</h3>
            <ul className="space-y-2">
              <li><Link href="/palette-generator" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">Palette Generator</Link></li>
              <li><Link href="/gradient-generator" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">Gradient Generator</Link></li>
              <li><Link href="/color-scheme-finder" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">Color Scheme Finder</Link></li>
              <li><Link href="/random-palette" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">Random Palette</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Accessibility</h3>
            <ul className="space-y-2">
              <li><Link href="/contrast-checker" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">Contrast Checker</Link></li>
              <li><Link href="/color-blindness-simulator" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">Color Blind Simulator</Link></li>
              <li><Link href="/wcag-compliance" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">WCAG Compliance</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">About</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} ColorKits. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span>Color tools for developers, by developers.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
