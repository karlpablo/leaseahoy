import * as Sentry from '@sentry/node'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    sampleRate: 1.0,
    initialScope: {
      tags: {
        source: 'api',
      },
    },
  })
}
