import Star from '@/icons/Star'

export default function LeaseProgramLegend() {
  return (
    <div className="flex gap-2 justify-center items-center bg-base-200 text-base-content p-6 rounded shadow">
      <div className="join">
        <div className="join-item badge text-base-100 px-2 py-4 min-w-[5rem] badge-error">
          <Star />
        </div>
        <div className="join-item badge text-base-100 px-2 py-4 min-w-[5rem] badge-warning">
          <Star /><Star />
        </div>
        <div className="join-item badge text-base-100 px-2 py-4 min-w-[5rem] badge-success">
          <Star /><Star /><Star />
        </div>          
      </div>
    </div>
  )
}