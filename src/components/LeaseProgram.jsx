import { useContext } from 'react'
import { AppContext } from '@/AppContext'
import { $ } from '@/utils'

export default function LeaseProgram({ trim, program }) {
  const { appContext, setAppContext } = useContext(AppContext)

  const buttonClass = {
    5: 'btn-success',
    4: 'btn-success',
    3: 'btn-warning',
    2: 'btn-error',
    1: 'btn-error',
  }[program?.value] + ' btn btn-xs md:btn-sm font-mono hover:brightness-110'

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

  return (
    program && (
      <button className={buttonClass} onClick={handleClick}>
        {$(program.monthlyTotalTaxed)}
      </button>
    )
  )
}