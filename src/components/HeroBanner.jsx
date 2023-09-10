export default function HeroBanner({ onGetStarted }) {
  return (
    <div className="hero h-full bg-neutral text-neutral-content rounded">
        <div className="space-y-8 text-center">
          <h1 className="text-4xl lg:text-5xl w-auto px-6 text-center font-serif leading-snug">
            Find the best auto lease rates!
          </h1>
          <button className="lg:hidden btn btn-primary" onClick={onGetStarted}>Get Started</button>
          <div className="hidden lg:block">
            <button className="btn btn-lg btn-primary" onClick={onGetStarted}>Get Started</button>
          </div>
        </div>
    </div>
  )
}