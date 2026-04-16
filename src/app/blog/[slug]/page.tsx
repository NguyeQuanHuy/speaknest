import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'src/content/blog')
  if (!fs.existsSync(blogDir)) return []
  const files = fs.readdirSync(blogDir)
  return files
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => ({ slug: f.replace(/\.mdx?$/, '') }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'src/content/blog', `${params.slug}.mdx`)
  if (!fs.existsSync(filePath)) return {}
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(raw)
  return {
    title: data.title,
    description: data.description,
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'src/content/blog', `${params.slug}.mdx`)
  if (!fs.existsSync(filePath)) notFound()

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(raw)

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        {data.category && (
          <span className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            {data.category}
          </span>
        )}
        <h1 className="text-3xl font-semibold mt-4 mb-3 leading-snug text-gray-900">
          {data.title}
        </h1>
        <p className="text-sm text-gray-500">
          {data.date} · {data.author} · {data.readTime}
        </p>
      </div>
      <article className="prose prose-lg max-w-none prose-headings:font-semibold prose-a:text-amber-600">
        <MDXRemote source={content} />
      </article>
    </main>
  )
}
