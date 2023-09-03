import { createContext, useState } from 'react'

export const AppContext = createContext()

export function AppContextProvider({ children }) {
  const [appContext, setAppContext] = useState({
    userSelections: {
      zip: '',
      year: null,
      make: null,
      model: null,
    },
    leaseProgramModal: {
      isVisible: false,
      trim: null,
      program: null,
    },
  })

  return (
    <AppContext.Provider value={{ appContext, setAppContext }}>
      {children}
    </AppContext.Provider>
  )
}

// todo: custom hook
// export function useUserSelections() {
//   const context = useContext(AppContext)
//   return context.userSelections
// }