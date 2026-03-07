import { notFound } from "next/navigation"
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { getBaseUrl } from "@/lib/links"
import Link from "next/link"

export const dynamic = 'force-static'
export const revalidate = false
export const dynamicParams = false

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  const baseUrl = getBaseUrl()

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} - Swadeshi Apps Blog`,
    description: post.description,
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      siteName: 'Swadeshi Apps',
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const breadcrumbs = [
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ]

  const baseUrl = getBaseUrl()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "Swadeshi Apps",
      "url": baseUrl,
    },
    "mainEntityOfPage": `${baseUrl}/blog/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {post.title}
            </h1>
            <p className="text-gray-500">{post.date}</p>
          </header>

          <Card>
            <CardContent className="p-6 md:p-8">
              <div
                className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </CardContent>
          </Card>

          {post.relatedAlternatives && post.relatedAlternatives.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Alternatives</h2>
              <div className="flex flex-wrap gap-3">
                {post.relatedAlternatives.map((alt) => (
                  <Link
                    key={alt}
                    href={`/alternatives/${alt}`}
                    className="text-blue-600 hover:underline bg-blue-50 px-3 py-1.5 rounded-md text-sm"
                  >
                    {alt} alternatives
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        <div className="mt-8 text-center">
          <Link href="/blog" className="text-blue-600 hover:underline">
            &larr; Back to all posts
          </Link>
        </div>
      </div>
    </>
  )
}
