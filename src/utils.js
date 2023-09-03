// Currency formatter
export function $(number=0, digits=0, symbol=`$`, zeroAllowed=false, placeholder='N/A', locale=`en-US`) {
  if (isNaN(number)) return placeholder
  if (number === 0) return zeroAllowed ? `${symbol}0` : placeholder

  const [wholes, decimals] = number.toFixed(digits).split('.')

  const results = []

  results.push(`${symbol}${(+wholes).toLocaleString(locale)}`)

  if (digits) results.push(decimals)

  return results.join('.')
}

export function comma(number=0, locale='en-US') {
  return `${number.toLocaleString(locale)}`
}

export function k(number=0, locale='en-US') {
  return `${(number/1000).toLocaleString(locale)}K`
}

export function isEven(number) {
  return number % 2 === 0
}