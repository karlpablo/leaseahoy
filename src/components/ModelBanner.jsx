export default function ModelBanner({ searchResults }) {
  const { year, make, model } = searchResults

  return (
    <div className="bg-base-200 text-base-content p-6 rounded shadow basis-full text-center font-extrabold text-2xl">
      {year} {make} {model}
    </div>
  )
}