import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schema } from './schemaTypes'
import { codeInput } from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'Eterno',

  projectId: 'vler86er',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,

  plugins: [structureTool(), visionTool(), codeInput()],

  schema: schema,
})
