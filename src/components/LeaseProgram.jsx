// import { useContext } from 'react'
// import { AppContext } from '@/AppContext'
import { $ } from '@/utils'

export default function LeaseProgram({ program }) {
  // const { appContext, setAppContext } = useContext(AppContext)

  const textClass = {
    5: 'text-success',
    4: 'text-success',
    3: 'text-warning',
    2: 'text-error',
    1: 'text-error',
  }[program?.value] + ' xl:text-lg font-mono font-bold cursor-pointer'

  /*
  function handleClick(e) {
    e.stopPropagation()
    
    setAppContext({
      ...appContext,
      leaseProgramModal: {
        isVisible: true,
        trim,
        program,
      },
    })
  }
  */

  return (
    program && (
      <div className={textClass}>
        <span className="tooltip block" data-tip={`${program.apr}% APR `}>{program.mf}</span>
        <span className="tooltip block" data-tip={$(program.residual)}>{program.residualRate}%</span>
      </div>
    )
  )
}