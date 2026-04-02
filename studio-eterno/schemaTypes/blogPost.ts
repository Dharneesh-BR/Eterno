import { type Rule, type SchemaTypeDefinition } from 'sanity'

const blogPost: SchemaTypeDefinition = {
    name: 'blogPost',
    type: 'document',
    title: 'Blog Post',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        validation: (Rule: Rule) => Rule.required()
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options: {
          source: 'title',
          maxLength: 96
        },
        validation: (Rule: Rule) => Rule.required()
      },
      {
        name: 'publishedAt',
        type: 'datetime',
        title: 'Published at',
        validation: (Rule: Rule) => Rule.required()
      },
      {
        name: 'mainImage',
        type: 'image',
        title: 'Main image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'thumbnail',
        type: 'image',
        title: 'Thumbnail',
        options: {
          hotspot: true
        },
        description: 'Thumbnail image for blog post cards (recommended: 400x300px)'
      },
      {
        name: 'body',
        type: 'array',
        title: 'Body',
        of: [
          {type: 'block'},
          {type: 'image'}
        ]
      },
      {
        name: 'shortDescription',
        type: 'text',
        title: 'Short Description',
        description: 'Brief description for blog cards (recommended: 100-150 characters)',
        rows: 3
      },
      {
        name: 'tags',
        type: 'array',
        title: 'Tags',
        of: [{type: 'string'}],
        description: 'Tags for categorizing and filtering blog posts'
      }
    ]
}

export default blogPost
  