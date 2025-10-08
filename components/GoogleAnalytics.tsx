import Script from 'next/script'

export function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-R5LKH1R7ZD';

  // Don't render if GA_ID is not set
  if (!GA_ID) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
