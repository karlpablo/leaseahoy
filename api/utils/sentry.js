import * as Sentry from '@sentry/react'

if (process.env.NODE_ENV === 'production') {
  console.log('Initializing Sentry for API...')

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    defaultIntegrations: false,
    environment: 'production',
    sampleRate: 1.0,
    initialScope: {
      location: 'api',
    },
  })
}