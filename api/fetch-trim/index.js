import checkZip from '../utils/check-zip'
import getTrim from '../utils/get-trim'
import fetchLeaseData from '../utils/fetch-lease-data'

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 }
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204 }

  const { uuid, zip, includeLeaseData=false } = JSON.parse(event.body)
  const trim = getTrim(uuid)

  if (!checkZip(zip) || !trim) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Invalid parameters.',
      })
    }
  }

  const responseBody = { ...trim }

  if (includeLeaseData) {
    responseBody.leaseData = await fetchLeaseData(trim.id, zip)
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
