export default function PriceTag({ config }) {
  const { label, value } = config

  return (
    <div className="priceTag">
      <label>{label}</label>
      <span>{value}</span>
    </div>
  )
}