import { defineType, defineField } from 'sanity'
import type {PreviewValue} from 'sanity'

export default defineType({
  name: 'program',
  type: 'document',
  title: 'Program',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule: any) => rule.required().error('Title is required')
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule: any) => rule.required().error('Slug is required')
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Short Description',
      description: 'A brief description shown in program listings',
      validation: (rule: any) => rule.required().error('Slug is required')
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Full Description',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true }
        },
        {
          type: 'code',
          options: {
            language: 'javascript',
            languageAlternatives: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' }
            ]
          }
        }
      ]
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Featured Image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
          validation: (rule: any) => rule.required().error('Slug is required')
        }
      ]
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price (INR)',
      validation: (rule: any) => rule.required().min(0).error('Price is required and must be 0 or more')
    }),
    defineField({
      name: 'discountPrice',
      type: 'number',
      title: 'Discount Price (INR)',
      validation: (rule: any) => rule.min(0).error('Discount price must be 0 or more')
    }),
    defineField({
      name: 'duration',
      type: 'string',
      title: 'Duration',
      description: 'e.g., "8 weeks", "1 hour"',
      validation: (rule: any) => rule.required().error('Slug is required')
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      title: 'Featured Program',
      description: 'Show this program in featured sections',
      initialValue: false
    }),
    defineField({
      name: 'strip',
      type: 'string',
      title: 'Strip Text',
      description: 'Text displayed on the program card strip for design purposes',
      validation: (rule: any) => rule.required().error('Strip text is required')
    }),
    defineField({
      name: 'video',
      type: 'file',
      title: 'Program Video',
      description: 'Video file to be displayed in program detail page (optional)',
      options: {
        accept: 'video/*'
      }
    }),
    defineField({
      name: 'programDate',
      type: 'date',
      title: 'Program Date',
      description: 'Date when the program will be conducted',
      validation: (rule: any) => rule.required().error('Program date is required')
    }),
    defineField({
      name: 'programTime',
      type: 'string',
      title: 'Program Time',
      description: 'Time when program will be conducted (e.g., "10:00 AM", "2:00 PM - 4:00 PM")',
      validation: (rule: any) => rule.required().error('Program time is required')
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    },
    prepare(selection: { title?: string; media?: PreviewValue['media'] }): PreviewValue {
      return {
        ...selection,
        subtitle: 'Program'
      }
    }
  }
})