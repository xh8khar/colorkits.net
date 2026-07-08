import type { Metadata } from 'next'
import Link from 'next/link'
import { learnPosts } from '@/lib/learn/posts'

export const metadata: Metadata = {
  title: 'Learn Color Theory — Free Online Color Tutorials',
  description: 'Master color theory with our comprehensive collection of tutorials and guides. Learn color models, accessibility, harmony, and best practices for design and development.',
  keywords: 'learn color theory, color tutorial, color guide, color for beginners, color design, color theory basics, color tips and tricks, color best practices',
  openGraph: {
    title: 'Learn Color Theory — Free Online Color Tutorials and Guides',
    description: 'Master color theory from beginner to advanced with our free tutorials, guides, and articles.',
  },
}

export default function LearnPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Learn Color Theory</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Comprehensive tutorials and guides to master color theory from the ground up.
        </p>
      </div>
      <div className="grid gap-8">
        {learnPosts.map(post => (
          <article key={post.slug} className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-rose-300 dark:hover:border-rose-700 transition-colors">
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              <span>&middot;</span>
              <span>{post.readTime}</span>
            </div>
            <Link href={`/learn/${post.slug}`} className="block">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mb-4">{post.description}</p>
            <div className="flex flex-wrap gap-2">
              {post.relatedTools.slice(0, 3).map(tool => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
