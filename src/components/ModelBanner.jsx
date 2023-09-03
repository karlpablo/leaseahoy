export default function ModelBanner({ userSelections }) {
  const { selectedYear, selectedMake, selectedModel } = userSelections

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <div className="basis-full flex justify-center bg-base-200 text-base-content p-4 rounded shadow">
        <span className="font-extrabold text-xl lg:text-2xl tracking-tight">
          {selectedYear} {selectedMake} {selectedModel}
        </span>
      </div>
      <div className="flex gap-2 justify-center items-center bg-base-200 text-base-content font-bold font-mono p-4 rounded shadow">
        <div className="shadow badge px-1 lg:px-2 py-2 lg:py-4 min-w-[4rem] badge-success">$</div>
        <div className="shadow badge px-1 lg:px-2 py-2 lg:py-4 min-w-[4rem] badge-warning">$$</div>
        <div className="shadow badge px-1 lg:px-2 py-2 lg:py-4 min-w-[4rem] badge-error">$$$</div>
      </div>
    </div>
  )
}