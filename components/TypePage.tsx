import { SoftwareWithMeta } from '@/lib/server-data'
import { TypeConfig } from '@/lib/types-server'
import { ProductCard } from '@/components/product-card'
import { WhyChooseSection } from '@/components/WhyChooseSection'
import { ComparisonTable } from '@/components/ComparisonTable'
import { FAQSection } from '@/components/FAQSection'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { HeroSection } from '@/components/ui/HeroSection'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

interface TypePageProps {
  typeSlug: string
  config: TypeConfig
  featuredApps: SoftwareWithMeta[]
  allApps: SoftwareWithMeta[]
  relatedTypes: Array<{ slug: string; config: TypeConfig }>
}

export default function TypePage({
  typeSlug,
  config,
  featuredApps,
  allApps,
  relatedTypes,
}: TypePageProps) {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: config.hero.title, href: `/${typeSlug}` },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <HeroSection
        title={config.hero.title}
        subtitle={config.hero.subtitle}
      />

      {/* All Apps - Moved to top */}
      {allApps.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              All {config.hero.title} ({allApps.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allApps.map((app) => (
                <ProductCard key={app.slug} software={app} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Section */}
      <WhyChooseSection benefits={config.whyChoose} />

      {/* Comparison Table */}
      <ComparisonTable comparison={config.comparison} />

      {/* FAQ Section */}
      <FAQSection faqs={config.faqs} typeSlug={typeSlug} typeName={config.hero.title} />

      {/* Related Types */}
      {relatedTypes.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Explore Related Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTypes.map(({ slug, config: relatedConfig }) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="group p-6 rounded-lg border bg-card hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                    {relatedConfig.hero.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {relatedConfig.hero.subtitle}
                  </p>
                  <div className="flex items-center text-primary">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Moved to bottom */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-green-500/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Switch to Swadeshi Apps?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Support Indian innovation and data sovereignty. Explore our complete
            directory of Made in India software.
          </p>
          <Button asChild size="lg">
            <Link href="/">
              Explore All Apps <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
