export default (text, separator) => {
  if (typeof text !== 'string') {
    throw new TypeError('Expected a string')
  }

  separator = typeof separator === 'undefined' ? '_' : separator

  return text
    .replace(
      /([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu,
      `$1${separator}$2`
    )
    .replace(
      /(\p{Lowercase_Letter}+)(\p{Uppercase_Letter}[\p{Lowercase_Letter}\d]+)/gu,
      `$1${separator}$2`
    )
    .toLowerCase()
}
