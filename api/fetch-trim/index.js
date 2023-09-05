import { checkZip } from '../utils/check-zip'
import { getTrim } from '../utils/get-trim'
import { fetchLeaseData } from '../utils/fetch-lease-data'
import '../utils/sentry'

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 }
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204 }

  const { uuid, zip } = JSON.parse(event.body)
  const trim = getTrim(uuid)

  if (!checkZip(zip) || !trim) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Invalid parameters.',
      })
    }
  }

  const responseBody = {
    ...trim,
    ...(await fetchLeaseData(trim.id, zip)),
  }

  // we don't need certain fields back
  delete responseBody.uuid
  delete responseBody.id
  delete responseBody.style

  if (process.env.NODE_ENV === 'production') {
    delete responseBody.isCached
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST',
    },
    body: JSON.stringify(responseBody),
  }
}
