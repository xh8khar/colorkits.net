import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { learnPosts } from '@/lib/learn/posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return learnPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = learnPosts.find(p => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} — ColorKits Learn`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function LearnPostPage({ params }: Props) {
  const { slug } = await params
  const post = learnPosts.find(p => p.slug === slug)
  if (!post) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <Link href="/learn" className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Learn
      </Link>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">{post.title}</h1>
        </header>

        <div
          className="prose prose-slate dark:prose-invert max-w-none prose-a:text-rose-600 dark:prose-a:text-rose-400 prose-code:text-sm prose-pre:bg-slate-900 prose-pre:text-slate-100"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Related Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {post.relatedTools.map(tool => (
            <Link
              key={tool.href}
              href={tool.href}
              className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 hover:border-rose-300 dark:hover:border-rose-700 hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-center"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          View all articles
        </Link>
      </div>
    </div>
  )
}
