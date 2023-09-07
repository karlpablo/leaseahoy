import { processLeaseData } from './process-lease-data'
import { getCache, setCache } from './cache'

export const fetchLeaseData = async (id, zip) => {
  const {
    NODE_ENV: env,
    LEASE_DATA_API_URL: apiUrl,
    LEASE_DATA_API_REFERRER: referrer,
    PROXY_API_URL: proxyUrl,
    PROXY_API_KEY: proxyKey,
  } = process.env

  let debug = {
    isCached: true,
  }

  let leaseData = await getCache(id, zip) // {...} or null

  if (!leaseData) {
    debug.isCached = false

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

      leaseData = await JSON.parse(atob(response.httpResponseBody))
    } catch (e) {
      console.error('Something went wrong with the proxy.', e, response)
    }

    await setCache(id, zip, leaseData)
  }

  // reshape the lease data for our needs
  leaseData = processLeaseData(leaseData)

  return {
    leaseData,
    debug: env === 'development' ? debug : null,
  }
}