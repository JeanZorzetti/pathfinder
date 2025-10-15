interface StructuredDataProps {
  type: "Organization" | "WebSite" | "Article" | "FAQPage" | "BreadcrumbList";
  data: any;
}

export const StructuredData = ({ type, data }: StructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// Predefined structured data for common use cases
export const organizationSchema = {
  name: "Pathfinder",
  description: "Plataforma completa de autoconhecimento baseada em ciência psicológica",
  url: "https://pathfinder.app",
  logo: "https://pathfinder.app/logo.png",
  sameAs: [
    // Add social media links when available
  ],
};

export const websiteSchema = {
  ...organizationSchema,
  potentialAction: {
    "@type": "SearchAction",
    target: "https://pathfinder.app/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};
