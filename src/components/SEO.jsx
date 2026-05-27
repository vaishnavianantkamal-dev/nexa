import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
}) {
  const siteTitle = "Nexaports Global - Premium Indian Food & Spice Exporter";
  const defaultDescription =
    "Nexaports Global is a leading exporter of premium quality Indian spices, grains, pulses, fruits, vegetables and dehydrated food products. We ensure the best quality and timely delivery worldwide.";
  const defaultKeywords =
    "nexaportsglobal, nexaports global, nexaports, Indian spices exporter, food exporter India, grains export, pulses export, fruits vegetables export, dehydrated products exporter";
  const siteUrl = "https://nexaportsglobal.com";

  const finalTitle = title ? `${title} | Nexaports Global` : siteTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalUrl = url ? `${siteUrl}${url}` : siteUrl;
  const finalImage = image || `${siteUrl}/logo.svg`;

  return (
    <Helmet defer={false}>
      {/* Standard Metadata */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Nexaports Global" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content="Nexaports Global" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* Canonical Link */}
      <link rel="canonical" href={finalUrl} />

      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Nexaports Global",
          url: siteUrl,
          logo: `${siteUrl}/logo.svg`,
          email: "Info@nexaportsglobal.com",
          telephone: "+91-9272008648",
          address: {
            "@type": "PostalAddress",
            streetAddress:
              "B-13, Gangabhyaday Residency, Near New District Court, Kasba Bawda",
            addressLocality: "Kolhapur",
            addressRegion: "Maharashtra",
            postalCode: "416006",
            addressCountry: "IN",
          },
        })}
      </script>
    </Helmet>
  );
}
