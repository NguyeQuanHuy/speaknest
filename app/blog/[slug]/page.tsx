import { notFound } from "next/navigation"

const posts: Record<string, { title: string; date: string; author: string; body: string }> = {
  "luyen-phat-am-tieng-anh-chuan": {
    title: "Cach luyen phat am tieng Anh chuan nhu nguoi ban ngu",
    date: "2025-04-16",
    author: "SpeakNest Team",
    body: "Bai viet dang cap nhat. Vui long quay lai sau!"
  }
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) notFound()
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">{post.date} · {post.author}</p>
      <p>{post.body}</p>
    </main>
  )
}
