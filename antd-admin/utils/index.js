export function mock({
  number,
  dataKeys,
}) {
  return Array(number).fill().map(_ => {
    const obj = {}
    dataKeys.forEach(key => {
      obj[key] = String(Math.random()).slice(0, 6)
    })
    return obj
  })
}