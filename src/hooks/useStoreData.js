import { useSanityData } from './useSanityData';

export function useStoreData() {
  const query = `*[_type == "store"] | order(sequence asc) {
    _id,
    title,
    slug,
    sequence,
    price,
    discountPrice,
    shortDescription,
    longDescription,
    bannerImage{
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    productGallery[]{
      _key,
      _type,
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    faq,
    _createdAt,
    _updatedAt
  }`;

  return useSanityData(query);
}

export function useProductBySlug(slug) {
  const query = `*[_type == "store" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    sequence,
    price,
    discountPrice,
    shortDescription,
    longDescription,
    bannerImage{
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    productGallery[]{
      _key,
      _type,
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    faq,
    _createdAt,
    _updatedAt
  }`;

  return useSanityData(query, { slug });
}
