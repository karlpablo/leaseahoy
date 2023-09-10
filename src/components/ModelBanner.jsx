import LeaseProgramLegend from '@/components/LeaseProgramLegend'

export default function ModelBanner({ searchResults }) {
  const { year, make, model } = searchResults

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <div className="bg-base-200 text-base-content p-6 rounded shadow basis-full text-center font-extrabold text-2xl">
        {year} {make} {model}
      </div>
      <LeaseProgramLegend />
    </div>
  )
}