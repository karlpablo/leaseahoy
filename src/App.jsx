import { useState, useEffect, useRef } from 'react'
import { AppContextProvider } from '@/AppContext'
import NavBar from '@/components/NavBar'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import HeroBanner from '@/components/HeroBanner'
import ModelBanner from '@/components/ModelBanner'
import TrimCard from '@/components/TrimCard'
import LeaseProgramModal from '@/components/LeaseProgramModal'
import '@/App.css'

export default function App() {
  const [meta, setMeta] = useState()
  const [preload, setPreload] = useState()

  useEffect(() => {
    let stale = false
    async function runEffect() {
      const response = await fetch('/meta.min.json')

      if (!stale) {
        setMeta(await response.json())
      }
    }

    runEffect()

    return () => stale = true
  }, [])

  useEffect(() => {
    if (meta) {
      const { pathname, search } = document.location

      // assume url is /<page>/<year>/<make>/<model>?zip=<zip>
      const [year, make, model] = pathname.split('/').slice(2)
      const zip = (new URLSearchParams(search)).get('zip')

      if (year && make && model && zip) {
        setPreload({
          year: decodeURIComponent(year),
          make: decodeURIComponent(make),
          model: decodeURIComponent(model),
          zip: decodeURIComponent(zip),
        })
      }
    }
  }, [meta])

  const firstField = useRef(null)
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  function toggleSidebar() {
    setSidebarIsOpen(!sidebarIsOpen)
  }

  function handleGetStarted() {
    firstField.current.focus()
    toggleSidebar()
  }

  const [searchResults, setSearchResults] = useState()

  function handleSearch(newParameters) {
    const { year, make, model, zip } = newParameters
    history.pushState({}, '', `/rates/${year}/${make}/${model}?zip=${zip}`)

    setSearchResults(newParameters) // technically, we're not really "searching" since we already know the trims for the model selected

    // only on mobile will the sidebar be open when this function triggers, so just close it
    if (sidebarIsOpen) toggleSidebar()
  }

  return (
    <AppContextProvider>
      {meta && (<>
        <div className="grid h-[100dvh] grid-cols-[auto] grid-rows-[auto_1fr_auto]">
          <NavBar onMenuClick={toggleSidebar} />
          <main className="overflow-hidden">
            <div className="drawer lg:drawer-open h-full">
              <input type="checkbox" id="sidebar" className="drawer-toggle" checked={sidebarIsOpen} readOnly />
              <div className="drawer-content bg-slate-600 overflow-y-auto p-4 lg:p-6 space-y-4">
                {searchResults ? (
                  <>
                    <ModelBanner searchResults={searchResults} />
                    {searchResults.trims.map(uuid => <TrimCard key={uuid} uuid={uuid} zip={searchResults.zip} />)}
                  </>
                ) : (
                  <HeroBanner onGetStarted={handleGetStarted} />
                )}
              </div>
              <div className="drawer-side z-50 lg:h-full">
                <Sidebar meta={meta} onSearch={handleSearch} firstField={firstField} preload={preload} />
                <label htmlFor="sidebar" className="drawer-overlay z-10" onClick={toggleSidebar}></label> 
              </div>
            </div>
          </main>
          <Footer />
        </div>
        <LeaseProgramModal />
      </>)}
    </AppContextProvider>
  )
}
