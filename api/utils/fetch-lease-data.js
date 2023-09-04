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
  
  let leaseData = isProd ? await getCache(id, zip) : null
  let isCached = false

  if (leaseData) {
    isCached = true
  } else {
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

    if (isProd) await setCache(id, zip, leaseData)
  }

  return {
    isCached,
    leaseData: processLeaseData(leaseData),
  }
}