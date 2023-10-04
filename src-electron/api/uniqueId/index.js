export default function (length) {
  const _sym = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
  let uniqueId = ''
  for (let i = 0; i < length; i++) {
    uniqueId += _sym[parseInt(Math.random() * _sym.length)]
  }

  return uniqueId
}
