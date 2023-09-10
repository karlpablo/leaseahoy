import { useState, useContext, useRef } from 'react'
import { AppContext } from '@/AppContext'
import { $, k } from '@/utils'
// import PriceTag from '@/components/PriceTag'

export default function LeaseProgramModal() {
  const { appContext, setAppContext } = useContext(AppContext)
  const { isVisible, trim, program } = appContext.leaseProgramModal
  const modalClass = 'modal' + (isVisible ? ' modal-open' : '')

  // Disclaimer collapse (also auto collapse when closing/hiding modal)
  const [ showDisclaimer, setShowDisclaimer ] = useState(false)

  // Create a form ref so we can auto-scroll to form top
  const form = useRef(null)

  // Closing the modal does a lot of things
  function closeModal(e) {
    e.stopPropagation()

    // Mainly setting context
    setAppContext({
      ...appContext,
      leaseProgramModal: {
        ...appContext.leaseProgramModal,
        isVisible: false,
        // don't unset trim and program to prevent UI shift
      },
    })

    // And also cleaning up by closing the disclaimer and scrolling back to top of form
    setShowDisclaimer(false)
    form.current.scrollTop = 0
  }

  // PriceTag config
  const priceClass = {
    5: 'bg-success text-success-content',
    4: 'bg-success text-success-content',
    3: 'bg-warning text-warning-content',
    2: 'bg-error text-error-content',
    1: 'bg-error text-error-content',
  }[program?.value]

  // const priceTagConfig = {
  //   label: 'Base Payment',
  //   value: `${$(program?.monthlyTotalTaxed)}/mo`,
  //   valueClass: 'text-2xl bg-base-100 text-base-content',
  // }

  return (
    program && <dialog className={modalClass}>
      <form ref={form} method="dialog" className="modal-box w-11/12 max-w-5xl">
        <div className="space-y-6">
          <div className={"p-6 flex flex-col md:flex-row justify-between items-center rounded-2xl gap-4 " + priceClass}>
            <div className="text-center md:text-left leading-tight">
              <h3 className="flex flex-col">
                <span className="font-extrabold">{trim.year} {trim.make} {trim.model}</span>
                <span className="font-extrabold text-2xl">{trim.trim}</span>
                <span className="text-sm">{trim.description}</span>
              </h3>
            </div>
            {/*<PriceTag config={priceTagConfig} />*/}
          </div>
          <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-200 tracking-tight">
            <div className="stat lg:place-items-end">
              <div className="stat-title">MSRP</div>
              <div className="stat-value text-xl lg:text-3xl font-mono">{$(trim.price.msrp + trim.price.destination)}</div>
              <div className="stat-desc">Inc. {$(trim.price.destination)} Destination Fee</div>
            </div>
            <div className="stat lg:place-items-end">
              <div className="stat-title">Term &amp; Mileage</div>
              <div className="stat-value text-xl lg:text-3xl font-mono">{program.term} months</div>
              <div className="stat-desc font-mono">{k(program.mileage)} miles/yr, {$(program.acqFee)} AF</div>
            </div>
            <div className="stat lg:place-items-end">
              <div className="stat-title">Money Factor</div>
              <div className="stat-value text-xl lg:text-3xl font-mono">{program.mf}</div>
              <div className="stat-desc font-mono">{program.apr}% APR</div>
            </div>
            <div className="stat lg:place-items-end">
              <div className="stat-title">Residual Value</div>
              <div className="stat-value text-xl lg:text-3xl font-mono">{program.residualRate}%</div>
              <div className="stat-desc font-mono">{$(program.residual)}</div>
            </div>
            {/*<div className="stat lg:place-items-end">
              <div className="stat-title">Total Base Payments</div>
              <div className="stat-value text-xl lg:text-3xl font-mono">{$(program.monthlyTotal * program.term)}</div>
              <div className="stat-desc font-mono">{$(program.monthlyTotal)} x {program.term} months</div>
            </div>*/}
          </div>
          <div className={"collapse collapse-plus bg-base-200 " + (showDisclaimer && 'collapse-open')}>
            <div className="collapse-title font-bold cursor-pointer leading-relaxed uppercase text-base-content opacity-50" onClick={() => setShowDisclaimer(!showDisclaimer)}>
              Disclaimers
            </div>
            <div className="collapse-content space-y-6 leading-relaxed"> 
              <p>The <strong>MSRP</strong> is provided directly by the vehicle manufacturer. It is also known as the `sticker price`. The <strong>Destination Fee (DF)</strong> includes handling and inland freight fees and may vary by state.</p>
              <p>The <strong>Money Factor (MF)</strong>, <strong>Residual Value (RV)</strong>, and <strong>Acquisition Fee (AF)</strong> are provided directly from the vehicle manufacturer`s finance division (aka `captive finance`). They are based off the selected <strong>Term &amp; Mileage</strong> and assumes that your credit score and history are <strong>Excellent</strong> (780+ FICO).</p>
              <p>The <strong>MF</strong> and <strong>RV</strong> from captive finances are <em>usually</em> the lowest you can get. They are also called `buy rates` because dealerships may profit from them by padding the <strong>MF</strong> (becoming `sell rates`) and keeping the difference, but they cannot change the <strong>RV</strong>, nor can you negotiate to lower it.</p>
              <div className="space-y-2">
                <p>The <strong>Base Payment</strong>, which is used to compare lease rates across all vehicles fairly and consistently, <strong className="underline">excludes</strong> the following:</p>
                <ul className="list-disc list-inside">
                  <li>Taxes</li>
                  <li>Dealer, government, or any other fees (except <strong>DF</strong> and <strong>AF</strong>)</li>
                  <li>Additional dealer markup</li>
                  <li>Discounts or VIP pricing</li>
                  <li>Downpayment (cap cost reduction) or trade-in</li>
                  <li>Rebates, incentives, loyalty coupons, etc.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <button className="btn btn-neutral" onClick={closeModal}>Close</button>
          </div>
        </div>
      </form>
    </dialog>
  )
}