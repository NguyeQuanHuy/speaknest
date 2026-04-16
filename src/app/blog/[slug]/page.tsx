import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), "src/content/blog", slug + ".mdx")
  const raw = fs.readFileSync(filePath, "utf-8")
  const { content, data } = matter(raw)
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mt-4 mb-3">{data.title}</h1>
        <p className="text-sm text-gray-500">{data.date} · {data.author}</p>
      </div>
      <article className="prose prose-lg max-w-none">
        <MDXRemote source={content} />
      </article>
    </main>
  )
}
