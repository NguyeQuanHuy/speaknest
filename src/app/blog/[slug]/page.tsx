import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"

const posts: Record<string, { title: string; date: string; author: string; content: string }> = {
  "luyen-phat-am-tieng-anh-chuan": {
    title: "Cach luyen phat am tieng Anh chuan nhu nguoi ban ngu",
    date: "2025-04-16",
    author: "SpeakNest Team",
    content: `
## Tai sao nguoi Viet kho phat am tieng Anh chuan?

Tieng Viet la ngon ngu thanh dieu, con tieng Anh dung **trong am (stress)** lam yeu to quyet dinh.

## 7 buoc luyen phat am tieng Anh chuan

### Buoc 1: Hoc bang phien am IPA

IPA la ban do dan duong cho phat am tieng Anh. Chi can nam vung **44 am vi**, ban co the tu hoc phat am bat ky tu nao.

### Buoc 2: Ky thuat Shadowing

Shadowing la **nghe va noi dong thoi**, bat chuoc giong ban ngu nhu cai bong.

1. Chon doan audio 30-60 giay tu TED Talk
2. Nghe toan bo, khong nhin script
3. Mo transcript, doc theo tung cau
4. Tat transcript, shadowing thuan tuy
5. Ghi am lai, so sanh voi ban goc

### Buoc 3: Ghi am ban than moi ngay

Day la buoc **hau het nguoi hoc bo qua** nhung lai quan trong nhat.
    `
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
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mt-4 mb-3">{post.title}</h1>
        <p className="text-sm text-gray-500">{post.date} · {post.author}</p>
      </div>
      <article className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} />
      </article>
    </main>
  )
}
