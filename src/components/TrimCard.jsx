import { useState, useEffect } from 'react'
import { $ } from '@/utils'
import LeaseSchedule from '@/components/LeaseSchedule'
import PriceTag from '@/components/PriceTag'

export default function TrimCard({ trim }) {
  const [leaseData, setLeaseData] = useState()
  useEffect(() => {
    let stale = false
    async function runEffect() {
      // const response = await fetch()

      if (!stale) {
        setLeaseData(null)
      }
    }
    runEffect()
    return () => stale = true
  }, [])

  return (
    <div className="rounded overflow-hidden shadow">
      {leaseData ? (
        <>
          <div className="bg-base-200 text-base-content w-full p-4 flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0">
            <h3 className="text-center lg:text-left text-lg tracking-tight">{trim.name}</h3>
            <PriceTag config={{ label: 'MSRP', value: $(trim.msrp + trim.destination) }} />
          </div>
          <div className="bg-base-100 overflow-x-auto">
            <LeaseSchedule trim={trim} leaseData={leaseData}  />
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