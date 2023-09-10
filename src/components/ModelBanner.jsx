import LeaseProgramLegend from '@/components/LeaseProgramLegend'

export default function ModelBanner({ searchResults }) {
  const { year, make, model } = searchResults

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <div className="basis-full flex justify-center bg-base-200 text-base-content p-6 rounded shadow">
        <span className="font-extrabold text-xl lg:text-2xl">
          {year} {make} {model}
        </span>
      </div>
      <LeaseProgramLegend />
    </div>
  )
}