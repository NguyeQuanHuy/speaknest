import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ slug: string }>
}

function boldify(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
}

function renderLine(line: string, i: number) {
  if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-semibold mt-8 mb-3 text-gray-900 dark:text-white">{line.slice(3)}</h2>
  if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">{line.slice(4)}</h3>
  if (line.startsWith("- ")) return <li key={i} className="ml-6 list-disc leading-relaxed text-gray-700 dark:text-gray-300">{line.slice(2)}</li>
  if (line.startsWith("> ")) return <blockquote key={i} className="border-l-4 border-amber-500 pl-4 italic my-4 bg-amber-50 dark:bg-amber-950/20 py-2 rounded-r text-gray-700 dark:text-gray-300">{line.slice(2)}</blockquote>
  if (line.startsWith("---")) return <hr key={i} className="border-gray-200 dark:border-gray-700 my-8" />
  if (line.trim() === "") return <div key={i} className="h-2" />
  return <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{__html: boldify(line)}} />
}

function parseTable(lines: string[], startIndex: number): { jsx: React.ReactNode, endIndex: number } {
  const tableLines = []
  let i = startIndex
  while (i < lines.length && (lines[i].startsWith("|") || lines[i].trim() === "")) {
    if (lines[i].startsWith("|")) tableLines.push(lines[i])
    i++
  }
  const headers = tableLines[0].split("|").filter(c => c.trim()).map(c => c.trim())
  const rows = tableLines.slice(2).map(row => row.split("|").filter(c => c.trim()).map(c => c.trim()))
  const jsx = (
    <div key={startIndex} className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-amber-100 dark:bg-amber-900/40">
            {headers.map((h, j) => <th key={j} className="px-4 py-3 text-left text-amber-800 dark:text-amber-400 font-semibold border border-gray-200 dark:border-gray-700">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, j) => (
            <tr key={j} className={j % 2 === 0 ? "bg-white dark:bg-gray-900/40" : "bg-gray-50 dark:bg-gray-800/40"}>
              {row.map((cell, k) => <td key={k} className="px-4 py-3 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
  return { jsx, endIndex: i }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), "src/content/blog", slug + ".mdx")
  if (!fs.existsSync(filePath)) notFound()
  const raw = fs.readFileSync(filePath, "utf-8")
  const { content, data } = matter(raw)
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0
  while (i < lines.length) {
    if (lines[i].startsWith("|")) {
      const { jsx, endIndex } = parseTable(lines, i)
      elements.push(jsx)
      i = endIndex
    } else {
      const el = renderLine(lines[i], i)
      if (el) elements.push(el)
      i++
    }
  }
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        {data.category && (
          <span className="text-sm font-medium text-amber-700 dark:text-amber-500 bg-amber-100 dark:bg-amber-950 px-3 py-1 rounded-full">
            {data.category}
          </span>
        )}
        <h1 className="text-3xl font-semibold mt-4 mb-3 text-gray-900 dark:text-white">{data.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{data.date} · {data.author} · {data.readTime}</p>
      </div>
      <article className="max-w-none space-y-2">
        {elements}
      </article>
    </main>
  )
}
