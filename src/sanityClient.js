import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'vler86er',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: import.meta.env.VITE_SANITY_USE_CDN === 'true', // Use environment variable
  perspective: 'published', // Use published content
  // Add CORS headers configuration
  withCredentials: false,
  // token is removed since it's not needed for read operations
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};

// Helper function to get all programs
export const getAllPrograms = async () => {
  const query = `*[_type == "program"]{
    _id,
    title,
    description,
    price,
    discountPrice,
    duration,
    strip,
    programDate,
    programTime,
    "video": video.asset->{
      url,
      originalFilename
    },
    "imageUrl": image.asset->url,
    "slug": slug.current,
    includes,
    benefits,
    requirements
  }`;
  
  return await client.fetch(query);
};

// Helper function to get a single program by slug
export const getProgramBySlug = async (slug) => {
  console.log('getProgramBySlug called with slug:', slug);
  
  if (!slug) {
    console.error('No slug provided to getProgramBySlug');
    return null;
  }
  
  try {
    const query = `*[_type == "program" && slug.current == $slug][0]{
      _id,
      title,
      description,
      price,
      discountPrice,
      duration,
      strip,
      programDate,
      programTime,
      "video": {
        url,
        originalFilename
      },
      "image": image.asset->{
        url,
        alt
      },
      "slug": slug.current,
      includes,
      benefits,
      requirements,
      body[]{
        ...select(
          _type == 'block' => @{
            ...@,
            children[]{
              ...@,
              marks[]
            },
            markDefs[]{
              ...@,
              _type == 'link' => @{
                _key,
                _type,
                href,
                blank
              }
            }
          },
          @
        )
      },
      "instructor": instructor->{
        name,
        title,
        bio,
        "image": image.asset->url
      }
    }`;
    
    console.log('Executing Sanity query with slug:', slug);
    console.log('Query being executed:', query); // Debug the actual query
    const result = await client.fetch(query, { slug, cache: 'no-store' });
    console.log('Raw Sanity query result:', result); // Raw result from Sanity
    
    if (!result) {
      console.log('No program found for slug:', slug);
      // Try to find all programs to see what slugs exist
      const allPrograms = await client.fetch(`*[_type == "program"]{ "slug": slug.current }`);
      console.log('All available program slugs:', allPrograms.map(p => p.slug));
    } else {
      console.log('Program found. Checking for strip and video fields...');
      console.log('Strip field in result:', 'strip' in result);
      console.log('Video field in result:', 'video' in result);
      console.log('All keys in result:', Object.keys(result));
    }
    
    return result;
  } catch (error) {
    console.error('Error in getProgramBySlug for slug:', slug, {
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
};

// Helper function to get a program by ID
export const getProgramById = async (id) => {
  console.log('getProgramById called with id:', id);
  
  if (!id) {
    console.error('No ID provided to getProgramById');
    return null;
  }
  
  try {
    const query = `*[_type == "program" && _id == $id][0]{
      _id,
      title,
      description,
      price,
      discountPrice,
      duration,
      strip,
      programDate,
      programTime,
      "video": video.asset->{
        url,
        originalFilename
      },
      "image": image.asset->{
        url,
        alt
      },
      "slug": slug.current,
      includes,
      benefits,
      requirements,
      body[]{
        ...select(
          _type == 'block' => @{
            ...@,
            children[]{
              ...@,
              marks[]
            },
            markDefs[]{
              ...@,
              _type == 'link' => @{
                _key,
                _type,
                href,
                blank
              }
            }
          },
          @
        )
      },
      "instructor": instructor->{
        name,
        title,
        bio,
        "image": image.asset->url
      }
    }`;
    
    console.log('Executing Sanity query with ID:', id);
    const result = await client.fetch(query, { id });
    console.log('Sanity query result for ID:', id, result);
    
    return result;
  } catch (error) {
    console.error('Error in getProgramById for ID:', id, {
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
};

// Helper function to get all programs (replaces category-based filtering)
export const getProgramsByCategory = async () => {
  // Since category was removed, return all programs
  return await getAllPrograms();
};

// Helper function to get all blog posts
export const getAllBlogPosts = async () => {
  const query = `*[_type == "blogPost"]{
    _id,
    title,
    slug,
    excerpt,
    shortDescription,
    publishedAt,
    thumbnail,
    mainImage,
    tags,
    body[]{
      ...select(
        _type == 'block' => @{
          ...@,
          children[]{
            ...@,
            marks[]
          },
          markDefs[]{
            ...@,
            _type == 'link' => @{
              _key,
              _type,
              href,
              blank
            }
          }
        },
        @
      )
    }
  } | order(publishedAt desc)`;
  
  return await client.fetch(query);
};

// Helper function to get a single blog post by slug
export const getBlogPostBySlug = async (slug) => {
  if (!slug) {
    console.error('No slug provided to getBlogPostBySlug');
    return null;
  }
  
  try {
    const query = `*[_type == "blogPost" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      excerpt,
      shortDescription,
      publishedAt,
      thumbnail,
      mainImage,
      tags,
      body[]{
        ...select(
          _type == 'block' => @{
            ...@,
            children[]{
              ...@,
              marks[]
            },
            markDefs[]{
              ...@,
              _type == 'link' => @{
                _key,
                _type,
                href,
                blank
              }
            }
          },
          @
        )
      }
    }`;
    
    const result = await client.fetch(query, { slug });
    return result;
  } catch (error) {
    console.error('Error in getBlogPostBySlug for slug:', slug, error);
    throw error;
  }
};
