import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  targetQuery?: string
  relatedApps?: string[]
  relatedAlternatives?: string[]
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export function getAllBlogSlugs(): string[] {
  try {
    if (!fs.existsSync(BLOG_DIR)) return []
    return fs.readdirSync(BLOG_DIR)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''))
  } catch {
    return []
  }
}

export function getAllBlogPosts(): BlogPostMeta[] {
  const slugs = getAllBlogSlugs()
  const posts = slugs.map(slug => getBlogPostMeta(slug)).filter(Boolean) as BlogPostMeta[]
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getBlogPostMeta(slug: string): BlogPostMeta | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)

  try {
    if (!fs.existsSync(filePath)) return null
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
      targetQuery: data.targetQuery,
      relatedApps: data.relatedApps,
      relatedAlternatives: data.relatedAlternatives,
    }
  } catch {
    return null
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)

  try {
    if (!fs.existsSync(filePath)) return null
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    const processedContent = await remark()
      .use(html)
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
      targetQuery: data.targetQuery,
      relatedApps: data.relatedApps,
      relatedAlternatives: data.relatedAlternatives,
      contentHtml,
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}
