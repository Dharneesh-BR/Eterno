// ./schemas/index.ts
import { type SchemaTypeDefinition } from 'sanity'

import program from './program'
import blogPost from './blogPost'
import store from './store'
import research from './research'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [program, blogPost, store, research],
}
