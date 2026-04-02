import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'vler86er',
    dataset: 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {
    autoUpdates: true,
    appId: 'w3c4eey8j4c2xryi54bd07yc'
  },
})
