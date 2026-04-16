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
  const filePath = path.join(process.cwd(), "app/blog", slug + ".mdx")
  const filePath2 = path.join(process.cwd(), "src/content/blog", slug + ".mdx")
  
  let raw = ""
  if (fs.existsSync(filePath)) {
    raw = fs.readFileSync(filePath, "utf-8")
  } else if (fs.existsSync(filePath2)) {
    raw = fs.readFileSync(filePath2, "utf-8")
  } else {
    notFound()
  }
  
  const { content, data } = matter(raw)
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        {data.category && (
          <span className="text-sm font-medium text-amber-500 bg-amber-950 px-3 py-1 rounded-full">
            {data.category}
          </span>
        )}
        <h1 className="text-3xl font-semibold mt-4 mb-3">{data.title}</h1>
        <p className="text-sm text-gray-400">{data.date} · {data.author} · {data.readTime}</p>
      </div>
      <article className="prose prose-invert prose-lg max-w-none">
        <MDXRemote source={content} />
      </article>
    </main>
  )
}
