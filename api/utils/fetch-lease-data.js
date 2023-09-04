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

  const isProd = env === 'production'
  const cache = isProd ? await getCache(id, zip) : null
  let leaseData

  if (cache) { // only if one exists AND it's not stale
    leaseData = cache.leaseData
  } else {
    try {
      const response = await (await fetch(proxyUrl, {
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
      console.error('Something went wrong with the proxy.', e)
    }

    if (isProd) await setCache(id, zip, leaseData)
  }

  return processLeaseData(leaseData)
}