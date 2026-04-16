import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), "src/content/blog", slug + ".mdx")
  
  if (!fs.existsSync(filePath)) notFound()
  
  const raw = fs.readFileSync(filePath, "utf-8")
  const { content, data } = matter(raw)
  
  const lines = content.split("\n")
  
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        {data.category && (
          <span className="text-sm font-medium text-amber-500 bg-amber-950 px-3 py-1 rounded-full">
            {data.category}
          </span>
        )}
        <h1 className="text-3xl font-semibold mt-4 mb-3">{data.title}</h1>
        <p className="text-sm text-gray-400">{data.date} · {data.author} · {data.readTime}</p>
      </div>
      <article className="max-w-none space-y-4">
        {lines.map((line, i) => {
          if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-semibold mt-8 mb-3 text-white">{line.slice(3)}</h2>
          if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-semibold mt-6 mb-2 text-white">{line.slice(4)}</h3>
          if (line.startsWith("- ")) return <li key={i} className="ml-4 text-gray-300 list-disc">{line.slice(2)}</li>
          if (line.startsWith("> ")) return <blockquote key={i} className="border-l-4 border-amber-500 pl-4 text-gray-400 italic my-4">{line.slice(2)}</blockquote>
          if (line.startsWith("---")) return <hr key={i} className="border-gray-700 my-8" />
          if (line.trim() === "") return <br key={i} />
          return <p key={i} className="text-gray-300 leading-relaxed">{line.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
        })}
      </article>
    </main>
  )
}
