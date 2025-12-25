import { Helmet } from 'react-helmet-async'

export default function SeoHead({
  title = 'KashPages',
  description = 'Contact-based landing page publishing platform for Kashmir businesses',
  keywords = ['Kashmir', 'businesses', 'landing pages'],
  ogImage = 'https://kashpages.in/og-default.png',
  ogUrl = 'https://kashpages.in',
  twitterHandle = '@kashpages'
}) {
  return (
    <Helmet>
      <title>{title} | KashPages</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={ogUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content={twitterHandle} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="charset" content="utf-8" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Helmet>
  )
}
