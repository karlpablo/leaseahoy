import { useState, useEffect } from 'react'
import { $ } from '@/utils'
import LeaseSchedule from '@/components/LeaseSchedule'
import PriceTag from '@/components/PriceTag'

export default function TrimCard({ uuid, zip }) {
  const [trim, setTrim] = useState()

  useEffect(() => {
    let stale = false

    async function runEffect() {
      const response = await (await fetch('/api/fetch-trim', {
        method: 'POST',
        body: JSON.stringify({ uuid, zip }),
      })).json()

      if (!stale) {
        setTrim(response)
      }
    }

    runEffect()

    return () => stale = true
  }, [])

  return (
    <div className="rounded overflow-hidden shadow">
      {trim ? (
        <>
          <div className="bg-base-200 text-base-content w-full p-4 flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0">
            <h3 className="text-center lg:text-left text-lg tracking-tight">{trim.trim} {trim.style}</h3>
            <PriceTag config={{ label: 'MSRP', value: $(trim.price.msrp + trim.price.destination) }} />
          </div>
          <div className="bg-base-100 overflow-x-auto">
            {/*<LeaseSchedule trim={trim} leaseData={leaseData}  />*/}
          </div>
        </>
      ) : (
        <div className="bg-base-200 p-4 text-center">
          <span className="loading loading-bars text-accent"></span>
        </div>
      )}
    </div>
  )
}