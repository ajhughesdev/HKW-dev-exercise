export default function renderCell(value: any, key: string) {
  const lowerCaseKey = key.toLowerCase()

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }

  if (typeof value === 'number' || typeof value === 'bigint' || typeof value === 'symbol' || typeof value === 'function') {
    return value.toString()
  }

  if (typeof value === 'undefined' || value === null) {
    return ''
  }

  if (lowerCaseKey.includes('date') && Date.parse(value)) {
    const date = new Date(value)
    return date.toLocaleDateString()
  }

  if (lowerCaseKey.includes('email')) {
    return <a href={`mailto:${value}`} className='email'>Send email</a>
  }

  if (lowerCaseKey.includes('phone')) {
    return <a href={`tel:${value}`} className='phone'>Call</a>
  }

  if (lowerCaseKey.includes('url') || lowerCaseKey.includes('href')) {
    return <a href={value} className='url'>{value}</a>
  }

  return value
}


export const genUniqueId = () => {
  const randomStr = Math.random().toString(36).substring(2, 8)
  return randomStr
}

export const camelToTitle = (camelCase: string) => {
  return camelCase.replace(/([a-z])(?=[A-Z])/g, '$1 ').replace(/^./, (str) => str.toUpperCase())

}