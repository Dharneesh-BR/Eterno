# Sanity CMS Integration Guide

This document explains how to work with Sanity CMS in the Svasam project.

## Project Structure

```
src/
  lib/
    sanity.js           # Sanity client configuration and utility functions
  hooks/
    useSanityData.js   # Custom hook for fetching data from Sanity
  components/
    BlogPosts.jsx      # Example component using Sanity data
```

## Setup

1. **Environment Variables**
   Create a `.env` file in the root of your project with the following variables:
   ```
   VITE_SANITY_PROJECT_ID=your_project_id
   VITE_SANITY_DATASET=production
   ```

2. **Install Dependencies**
   ```bash
   npm install @sanity/client
   ```

## Usage

### 1. Fetching Data

#### Using the `useSanityData` Hook

```javascript
import { useSanityData } from '../hooks/useSanityData';

function MyComponent() {
  const query = `*[_type == "blogPost"] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "authorName": author->name
  } | order(publishedAt desc)`;

  const { data, loading, error } = useSanityData(query);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <p>By {post.authorName}</p>
        </div>
      ))}
    </div>
  );
}
```

#### Using Direct Client Methods

```javascript
import { client } from '../lib/sanity';

// Fetch all documents of a type
const fetchAllPosts = async () => {
  const query = `*[_type == "blogPost"]`;
  const posts = await client.fetch(query);
  return posts;
};

// Fetch a single document by ID
const fetchPostById = async (id) => {
  const query = `*[_type == "blogPost" && _id == $id][0]`;
  const post = await client.fetch(query, { id });
  return post;
};
```

### 2. Creating New Schema Types

1. Add a new file in `studio-svasam/schemaTypes/` (e.g., `newType.ts`)
2. Define your schema using Sanity's schema types
3. Import and add it to the schema array in `schemaTypes/index.ts`

## Best Practices

1. **Reuse Queries**: Store commonly used GROQ queries in a shared file
2. **Image Handling**: Use Sanity's image pipeline for optimal images
   ```javascript
   import imageUrlBuilder from '@sanity/image-url';
   
   const builder = imageUrlBuilder(client);
   const urlFor = (source) => builder.image(source);
   
   // Usage
   <img src={urlFor(post.mainImage).width(800).url()} alt={post.title} />
   ```

3. **Error Handling**: Always handle loading and error states
4. **TypeScript**: Consider adding TypeScript types for better developer experience

## Common Queries

### Get all posts with author information
```groq
*[_type == "blogPost"] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "authorName": author->name,
  "authorImage": author->image.asset->url
} | order(publishedAt desc)
```

### Get a single post by slug
```groq
*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  body,
  publishedAt,
  "authorName": author->name,
  "authorImage": author->image.asset->url
}
```

## Troubleshooting

- **CORS Issues**: Make sure to add your frontend URL to Sanity's CORS origins in the Sanity dashboard
- **Missing Data**: Check if the schema types match between your frontend queries and Sanity schema
- **Slow Queries**: Use the Sanity Vision plugin to test and optimize your GROQ queries

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/query-cheat-sheet)
- [React + Sanity Guide](https://www.sanity.io/guides/react-development)
