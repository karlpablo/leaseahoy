import ThumbsUp from '@/icons/ThumbsUp'
import ThumbsDown from '@/icons/ThumbsDown'
import Star from '@/icons/Star'

export default function ModelBanner({ searchResults }) {
  const { year, make, model } = searchResults

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <div className="basis-full flex justify-center bg-base-200 text-base-content p-4 rounded shadow">
        <span className="font-extrabold text-xl lg:text-2xl">
          {year} {make} {model}
        </span>
      </div>
      <div className="flex gap-2 justify-center items-center bg-base-200 text-base-content font-bold font-mono p-4 rounded shadow">
        <div className="join">
          <div className="join-item badge text-base-100 px-2 py-4 min-w-[6rem] badge-error">
            <Star />
          </div>
          <div className="join-item badge text-base-100 px-2 py-4 min-w-[6rem] badge-warning">
            <Star /><Star />
          </div>
          <div className="join-item badge text-base-100 px-2 py-4 min-w-[6rem] badge-success">
            <Star /><Star /><Star />
          </div>          
        </div>
      </div>
    </div>
  )
}