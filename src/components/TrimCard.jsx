import { useState, useEffect } from 'react'
import { $ } from '@/utils'
import LeaseSchedule from '@/components/LeaseSchedule'
import PriceTag from '@/components/PriceTag'

export default function TrimCard({ uuid, zip }) {
  const [trim, setTrim] = useState(null)

  useEffect(() => {
    let stale = false

    async function runEffect() {
      try {
        const response = await (await fetch('/api/fetch-trim', {
          method: 'POST',
          body: JSON.stringify({
            uuid,
            zip,
          }),
        })).json()

        if (!stale) {
          setTrim(response)
        }
      } catch(e) {
        console.error('Error loading trim', uuid, zip)
      }
    }

    runEffect()

    return () => stale = true
  }, [uuid, zip])

  return (
    <div className="rounded overflow-hidden shadow">
      {trim ? (
        <>
          <div className="bg-base-300 text-base-content w-full p-6 flex flex-col md:flex-row md:justify-between items-center md:items-center gap-y-6">
            <h3 className="text-center md:text-left text-lg flex flex-col">
              <span className="font-extrabold">{trim.trim}</span>
              <span className="font-serif">{trim.description}</span>
            </h3>
            <PriceTag config={{ label: 'MSRP', value: $(trim.price.msrp + trim.price.destination) }} />
          </div>
          <div className="bg-white overflow-x-auto">
            {trim.leaseData?.programs ? (
              <LeaseSchedule trim={trim} />
            ): (
              <p className="p-6 text-error text-center">No lease data found.</p>
            )}
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