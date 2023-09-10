// import { useContext } from 'react'
// import { AppContext } from '@/AppContext'
import Star from '@/icons/Star'
// import { $ } from '@/utils'

export default function LeaseProgram({ programs, term, mileage }) {
  // const { appContext, setAppContext } = useContext(AppContext)
  const program = programs.find(p => p.mileage === mileage && p.term === term)

  /*
  const textClass = {
    5: 'text-success',
    4: 'text-success',
    3: 'text-warning',
    2: 'text-error',
    1: 'text-error',
  }[program?.value] + ' font-mono font-bold cursor-pointer'
  */

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
      <div className="tooltip cursor-pointer text-slate-200" data-tip={`${program.mf} MF + ${program.residualRate}% RV`} onClick={handleClick}>
        <span className={program.value > 1 ? 'text-amber-400' : ''}><Star /></span>
        <span className={program.value > 2 ? 'text-amber-400' : ''}><Star /></span>
        <span className={program.value > 3 ? 'text-amber-400' : ''}><Star /></span>
        <span className={program.value > 4 ? 'text-amber-400' : ''}><Star /></span>
      </div>
    ) : (
      <span className="text-base-300">N/A</span>
    )
  )
}