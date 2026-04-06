import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  structuredData = null,
  noIndex = false,
  canonicalUrl = null
}) => {
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_SITE_URL || (import.meta.env.PROD ? 'https://eterno.fit' : 'http://localhost:3000');
  const currentUrl = canonicalUrl || `${baseUrl}${location.pathname}${location.search}`;

  const defaultTitle = 'Eterno - Your Space for Healing, Growth & Inner Transformation';
  const defaultDescription = 'Discover balance, clarity, and emotional wellbeing at Eterno. Connect with trusted spiritual guides for mindfulness, meditation, and personal growth.';
  const defaultImage = `${baseUrl}/icons/eterno-logo.png`;
  const defaultKeywords = 'spiritual healing, mindfulness, meditation, emotional wellbeing, personal growth, inner peace, wellness, spiritual guidance, mental health, self-discovery, transformation';

  const finalTitle = title ? `${title} | Eterno` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image ? `${baseUrl}${image}` : defaultImage;
  const finalKeywords = keywords ? `${defaultKeywords}, ${keywords}` : defaultKeywords;

  // Generate structured data for different page types
  const getStructuredData = () => {
    if (structuredData) {
      return structuredData;
    }

    // Default structured data based on page type
    switch (type) {
      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description: finalDescription,
          image: finalImage,
          url: currentUrl,
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString(),
          author: {
            '@type': 'Organization',
            name: 'Eterno'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Eterno',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/icons/eterno-logo.png`
            }
          }
        };

      case 'service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: title,
          description: finalDescription,
          provider: {
            '@type': 'Organization',
            name: 'Eterno',
            url: baseUrl
          },
          areaServed: 'Worldwide',
          availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: currentUrl
          }
        };

      default:
        return {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description: finalDescription,
          url: currentUrl,
          image: finalImage,
          mainEntity: {
            '@type': 'Organization',
            name: 'Eterno',
            url: baseUrl,
            description: defaultDescription
          }
        };
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Eterno" />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Eterno" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:site" content="@eterno" />

      {/* Additional Meta Tags */}
      <meta name="application-name" content="Eterno" />
      <meta name="apple-mobile-web-app-title" content="Eterno" />
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
      <link rel="preconnect" href="https://firebaseio.com" crossorigin />
      <link rel="dns-prefetch" href="//checkout.razorpay.com" />
    </Helmet>
  );
};

export default SEO;
