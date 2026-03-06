import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getAllBlogPosts } from "@/lib/blog"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { getBaseUrl } from "@/lib/links"

export const dynamic = 'force-static'
export const revalidate = false

export const metadata = {
  title: "Blog - Swadeshi Apps",
  description: "Honest comparisons and reviews of Indian software alternatives. Unbiased analysis with real user feedback.",
  alternates: {
    canonical: `${getBaseUrl()}/blog`,
  },
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  const breadcrumbs = [
    { label: "Blog" },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
      <p className="text-lg text-gray-600 mb-8">
        Honest comparisons and reviews of Indian software alternatives.
      </p>

      {posts.length === 0 ? (
        <p className="text-gray-500">No blog posts yet. Check back soon!</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{post.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
