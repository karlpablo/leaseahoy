export default function NavBar({ onMenuClick }) {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="navbar-start">
        <div className="dropdown">
          <label htmlFor="sidebar" tabIndex="0" className="btn btn-ghost btn-circle lg:hidden" onClick={onMenuClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
        </div>
      </div>
      <div className="navbar-center">
        <a className="text-3xl font-cursive relative" href="/">
          LeaseAhoy!
          <sup className="beta font-mono text-[10px] absolute top-[6px] right-[8px]">BETA</sup>
        </a>
      </div>
      <div className="navbar-end">
      </div>
    </div>
  )
}