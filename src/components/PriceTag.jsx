export default function PriceTag({ config }) {
  const { label='Price',
          labelClass='bg-neutral text-neutral-content',
          value='FREE',
          valueClass='bg-base-100 text-base-content',
        } = config

  return (
    <div className="priceTag">
      <label className={labelClass}>{label}</label>
      <span className={valueClass}>{value}</span>
    </div>
  )
}