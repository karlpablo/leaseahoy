import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPA_DB_URL,
    process.env.SUPA_DB_KEY,
    { auth: { persistSession: false }})

export const getCache = async (id, zip) => {
  let cache = null
  
  let { data, error } = await supabase
    .from(process.env.SUPA_DB_CACHE)
    .select('last_updated_at,lease_data,query_count')
    .eq('id', id)
    .eq('zip', zip)

  if (error) {
    console.log(error)
    return null
  }

  if (data.length > 0) {
    cache = data[0]

    // query_count++
    await supabase
      .from(process.env.SUPA_DB_CACHE)
      .update({ query_count: (cache.query_count + 1) })
      .eq('id', id)
      .eq('zip', zip)
    
    // if data is stale (not from this month), return null to allow setCache() to update its lease_data
    if ((new Date(cache.last_updated_at)).getMonth() !== (new Date()).getMonth()) {
      cache = null
    }
  }

  return cache
}

export const setCache = async (id, zip, leaseData) => {
  const newEntry = {
    id,
    zip,
    lease_data: leaseData,
  }

  // update cache (or insert new cache)
  await supabase
    .from(process.env.SUPA_DB_CACHE)
    .upsert({
      ...newEntry,
      last_updated_at: new Date(),
    })

  // also add to archive regardless if new or update
  await supabase
    .from(process.env.SUPA_DB_ARCHIVE)
    .insert(newEntry)
}