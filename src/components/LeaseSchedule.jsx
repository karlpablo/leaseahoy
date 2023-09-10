import { useState, useEffect } from 'react'
import { comma } from '@/utils'
import LeaseProgram from '@/components/LeaseProgram'

export default function LeaseSchedule({ trim }) {
  const [programs, setPrograms] = useState([])

  useEffect(() => {
    const dealerFees = 0
    const downpayments = 0
    const rebates = 0
    const tradeIn = 0
    // const isZeroDriveOff = false
    const taxRate = 1

    const sellingPrice = trim.price.msrp + trim.price.destination
    const grossCapCost = sellingPrice + dealerFees
    const netCapCost = grossCapCost - (downpayments + rebates + tradeIn)

    const updatedPrograms = trim.leaseData.programs.map(program => {
      const calc = {}

      // Money factor expressed as APR
      calc.apr = Math.round(program.mf * 2400 * 100) / 100

      // How much the car will be at the end of the lease
      calc.residualRate = Math.round(program.rv * 100)
      calc.residual = Math.round(sellingPrice * program.rv * 100) / 100

      // How much the car's value went down at the end of the lease
      calc.depreciation = Math.round((netCapCost - calc.residual) * 100) / 100

      // Depreciation per month (what if $0 drive-off for 1st month? -1?)
      calc.monthlyBase = Math.round(calc.depreciation / program.term * 100) / 100

      calc.monthlyRent = Math.round((netCapCost + calc.residual) * program.mf * 100) / 100

      calc.monthlyTotal = Math.round(calc.monthlyBase + calc.monthlyRent)

      calc.monthlyTotalTaxed = Math.round(calc.monthlyTotal * taxRate)

      calc.value = 3 // default for highlighter

      return {
        ...program,
        ...calc,
      }
    })

    // sort by monthly total, then add highlighter indices
    updatedPrograms.sort((a, b) => {
      return (a.monthlyTotal > b.monthlyTotal) ? 1 : -1
    })

    // best (cheapest) and worst (most expensive), but there could be ties!
    const best = updatedPrograms.at(0)
    const worst = updatedPrograms.at(-1)

    // assign value based on +/- 5% from max/min, also account for ties
    updatedPrograms.forEach(program => {
      if (program === best || program.monthlyTotal === best.monthlyTotal) {
        program.value = 5
      } else if (program === worst || program.monthlyTotal === worst.monthlyTotal) {
        program.value = 1
      } else if (program.monthlyTotal < best.monthlyTotal * 1.05) {
        program.value = 4
      } else if (program.monthlyTotal > worst.monthlyTotal * 0.95) {
        program.value = 2
      }
    })

    setPrograms(updatedPrograms)
  }, [trim])

  return (
    <table className="table table-xs sm:table-sm table-fixed">
      <thead>
        <tr>
          <th>
            <span className="sm:hidden">MF/RV</span>
            <span className="hidden sm:inline">Money Factor &amp;<br />Residual Value</span>
          </th>
          {trim.leaseData.terms.map(term => (
            <th key={term}>
              {term}<br />months
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {trim.leaseData.mileages.map(mileage => (
          <tr key={mileage}>
            <th>
              {comma(mileage)}<br />miles
            </th>
            {trim.leaseData.terms.map(term => (
              <td key={term}>
                <LeaseProgram trim={trim} programs={programs} term={term} mileage={mileage} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
