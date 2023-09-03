import { createClient } from '@supabase/supabase-js'
import data from './data.ignore.json'
import zips from './zipcodes.json'

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 }
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204 }

  const allowFetchLeaseData = !true

  const { uuid, zip } = JSON.parse(event.body)

  if (!zips.includes(zip)) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Invalid zip code.',
      })
    }
  }

  const localMatch = data.find(trim => trim.uuid === uuid)

  const myResponse = {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST',
    },
    body: {
      // trim: null,
      // style: null,
      // price: {},
      // specs: {},
      // packages: null,
      // leaseSchedule: {
      //   programs: [],
      //   mileages: [],
      //   terms: [],
      // },
    },
  }

  if (localMatch) {
    myResponse.statusCode = 200
    myResponse.body = {
      ...localMatch,
    }

    // myResponse.body.trim = localMatch.trim // temp
    // myResponse.body.style = localMatch.style // temp
    // Object.assign(myResponse.body.price, localMatch.price)
    // myResponse.body.packages = localMatch.packages
    // Object.assign(myResponse.body.specs, localMatch.specs)

    if (allowFetchLeaseData) {
      const proxyResponse = await fetchLeaseData(localMatch.tag, zip)

      if (proxyResponse.httpResponseBody) {
        const leaseData = await JSON.parse(atob(proxyResponse.httpResponseBody))

        // send to logger (prod only)
        // if (isProd) {
        //   const logger = createClient(process.env.SUPA_DB_URL, process.env.SUPA_DB_KEY, {
        //     auth: {
        //       persistSession: false,
        //     },
        //   })

        //   const { data, error } = await logger
        //     .from(process.env.SUPA_DB_TABLE)
        //     .insert([
        //       {
        //         zip,
        //         tag: atob(localMatch.tag),
        //         leaseData,
        //       },
        //     ])

        //   // if (error) console.log(error)
        // }

        if (leaseData.terms && Object.values(leaseData.terms).length > 0) {
          const {
            KEY_FOR_TERM,
            KEY_FOR_MF,
            KEY_FOR_RV,
            KEY_FOR_ACQFEE,
          } = process.env

          const sched = myResponse.body.leaseSchedule

          // all available mileages
          sched.mileages = Object.keys(leaseData.terms).map(t => +t).sort()

          // all available terms
          for (const mileage of sched.mileages) {
            for (const rate of leaseData.terms[mileage]) {
              if (!sched.terms.includes(rate[KEY_FOR_TERM])) {
                sched.terms.push(rate[KEY_FOR_TERM])
              }
            }
          }

          // all programs
          for (const term of sched.terms.sort()) {
            for (const mileage of sched.mileages) {
              const program = leaseData.terms[mileage].find(p => p[KEY_FOR_TERM] === term)

              if (program) {
                sched.programs.push({
                  term,
                  mileage,
                  mf: program[KEY_FOR_MF],
                  rv: program[KEY_FOR_RV],
                  acqFee: program[KEY_FOR_ACQFEE],
                })
              }
            }
          }
        }
      } else {
        console.log(proxyResponse)
      }
    }
  }

  myResponse.body = JSON.stringify(myResponse.body)
  return myResponse
}

async function fetchLeaseData(tag, zip) {
  const url = String(process.env.LEASE_DATA_API_URL).replace('[TAG]', atob(tag))
                                                    .replace('[ZIP]', zip)

  return await (await fetch(process.env.PROXY_API_URL, {
    method: 'POST',
    body: JSON.stringify({
      url,
      httpResponseBody: true,
      customHttpRequestHeaders: [{
        name: 'Referer',
        value: process.env.LEASE_DATA_API_REFERRER,
      }],
    }),
    headers: {
      'Authorization': `Basic ${btoa(process.env.PROXY_API_KEY+':')}`,
      'Content-Type': 'application/json',
    },
  })).json()
}