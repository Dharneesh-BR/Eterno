import { useSanityData } from './useSanityData';

export function useResearchData() {
  const query = `*[_type == "research"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    shortDescription,
    publishedAt,
    thumbnail,
    mainImage,
    tags,
    link,
    body
  }`;

  return useSanityData(query);
}

export function useResearchBySlug(slug) {
  const query = `*[_type == "research" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    shortDescription,
    publishedAt,
    thumbnail,
    mainImage,
    tags,
    link,
    body
  }`;

  return useSanityData(query, { slug });
}
