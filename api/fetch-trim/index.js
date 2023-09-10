import '../utils/sentry'
import { checkZip } from '../utils/check-zip'
import { getTrim } from '../utils/get-trim'
import { fetchLeaseData } from '../utils/fetch-lease-data'

export const handler = async (event) => {
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

  // we don't need certain fields back from trim
  delete responseBody.uuid
  delete responseBody.id
  delete responseBody.style

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
