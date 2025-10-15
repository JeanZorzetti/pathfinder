import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

export const SEOHead = ({
  title,
  description,
  keywords,
  ogImage = "/og-image.jpg",
  canonicalUrl,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
}: SEOHeadProps) => {
  const fullTitle = title.includes("Pathfinder") ? title : `${title} | Pathfinder`;
  const url = canonicalUrl || window.location.href;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = true) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description, false);
    if (keywords) updateMetaTag("keywords", keywords, false);
    updateMetaTag("author", author || "Pathfinder", false);

    // Open Graph
    updateMetaTag("og:title", fullTitle);
    updateMetaTag("og:description", description);
    updateMetaTag("og:image", ogImage);
    updateMetaTag("og:url", url);
    updateMetaTag("og:type", type);
    updateMetaTag("og:site_name", "Pathfinder");
    updateMetaTag("og:locale", "pt_BR");

    // Twitter Card
    updateMetaTag("twitter:card", "summary_large_image", false);
    updateMetaTag("twitter:title", fullTitle, false);
    updateMetaTag("twitter:description", description, false);
    updateMetaTag("twitter:image", ogImage, false);

    // Article specific
    if (type === "article") {
      if (publishedTime) updateMetaTag("article:published_time", publishedTime);
      if (modifiedTime) updateMetaTag("article:modified_time", modifiedTime);
      if (author) updateMetaTag("article:author", author);
      if (section) updateMetaTag("article:section", section);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [fullTitle, description, keywords, ogImage, url, type, publishedTime, modifiedTime, author, section]);

  return null;
};
