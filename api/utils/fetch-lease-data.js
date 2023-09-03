import processLeaseData from './process-lease-data'

export default async (id, zip) => {
  const {
    LEASE_DATA_API_URL: apiUrl,
    LEASE_DATA_API_REFERRER: referrer,
    PROXY_API_URL: proxyUrl,
    PROXY_API_KEY: proxyKey,
  } = process.env

  let response

  try {
    response = await (await fetch(proxyUrl, {
      method: 'POST',
      body: JSON.stringify({
        url: String(apiUrl).replace('[ID]', id).replace('[ZIP]', zip),
        httpResponseBody: true,
        customHttpRequestHeaders: [{
          name: 'Referer',
          value: referrer,
        }],
      }),
      headers: {
        'Authorization': `Basic ${btoa(proxyKey+':')}`,
        'Content-Type': 'application/json',
      },
    })).json()

    response = await JSON.parse(atob(response.httpResponseBody))
  } catch (e) {
    console.error('Something went wrong with the proxy or the actual lease data API.')
  }

  return processLeaseData(response)
}