// import { useContext } from 'react'
// import { AppContext } from '@/AppContext'
import { $ } from '@/utils'

export default function LeaseProgram({ programs, term, mileage }) {
  // const { appContext, setAppContext } = useContext(AppContext)
  const program = programs.find(p => p.mileage === mileage && p.term === term)

  const textClass = {
    5: 'text-success',
    4: 'text-success',
    3: 'text-warning',
    2: 'text-error',
    1: 'text-error',
  }[program?.value] + ' font-mono font-bold cursor-pointer'

  function handleClick(e) {
    e.stopPropagation()

    // don't show modal (for now)
    return
    
    /*
    setAppContext({
      ...appContext,
      leaseProgramModal: {
        isVisible: true,
        trim,
        program,
      },
    })
    */
  }

  return (
    program ? (
      <div className={textClass} onClick={handleClick}>
        {/*$(program.monthlyTotal)*/}
        <span className="tooltip block" data-tip={`${program.apr}% APR `}>{program.mf}</span>
        <span className="tooltip block" data-tip={$(program.residual)}>{program.residualRate}%</span>
      </div>
    ) : (
      <span>N/A</span>
    )
  )
}