import { processLeaseData } from './process-lease-data'

export const fetchLeaseData = async (id, zip, isProd) => {
  const {
    NODE_ENV: env,
    LEASE_DATA_API_URL: apiUrl,
    LEASE_DATA_API_REFERRER: referrer,
    PROXY_API_URL: proxyUrl,
    PROXY_API_KEY: proxyKey,
  } = process.env

  if (env === 'production') {
    // todo: cache and log to supabase here
    console.log('CACHE CACHE')
  }

  // check cache (zip, id)
  if (isCached) {
    if (isOld) { // from previous month
      // save previous data
      // fetch with proxy
    } else {
      // hits +1  
      // return cache
    }
  } else {
    // fetch with proxy
    // add to cache db
  }

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
    console.error('Something went wrong with the proxy.', e)
  }

  // todo: send to cache db

  return processLeaseData(response)
}