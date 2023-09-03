import { createClient } from '@supabase/supabase-js'
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
//         tag: atob(trim.tag),
//         leaseData,
//       },
//     ])

//   // if (error) console.log(error)
// }