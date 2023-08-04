TODO: Update README.


```typescript
// Customized render function for a nested address object in the form of
// { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001' }
return (
    <div>
      {Object.entries(value).map(([k, v], index) => {
        // Check if the value is another nested object
        if (typeof v === 'object' && v !== null) {
          return (
            <div key={index}>
              {k}:
              <div style={{ marginLeft: '10px' }}>
                {Object.entries(v).map(([k2, v2], index2) => (
                  <div key={index2}>
                    {k2}: {v2}
                  </div>
                ))}
              </div>
            </div>
          )
        }
        return (
          <div key={index}>
            {k}: {v}
          </div>
        )
      })}
    </div>
  )

```

```typescript
// Basic type inference for rendering data from an unknown source,
// as long as it isn't nested data.
export default function renderCell(value: any, key: string) {
  const lowerCaseKey = key.toLowerCase()

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint' || typeof value === 'symbol' || typeof value === 'function') {
    return value.toString()
  }

  if (typeof value === 'undefined' || value === null) {
    return ''
  }

  if (Array.isArray(value)) {
    return value.join(', ')
  }

  if (typeof value === 'object' && value !== null) {
    if ('href' in value) {
      return value.href
    }

    if ('email' in value) {
      return value.email
    }

    if ('phone' in value) {
      return value.phone
    }

    if ('url' in value) {
      return <a href={value.url} className='url'>{value.url}</a>
    }

    if ('tags' in value) {
      return value.tags.join(', ')
    }

    if ('id' in value) {
      return value.id
    }
    return JSON.stringify(value)
  }

  if (lowerCaseKey.includes('date') && Date.parse(value)) {
    const date = new Date(value)
    return date.toLocaleDateString()
  }

  if (key.includes('email')) {
    return <a href={`mailto:${value}`} className='email'>Send email</a>
  }

  if (lowerCaseKey.includes('phone')) {
    return <a href={`tel:${value}`} className='phone'>Call</a>
  }

  if (lowerCaseKey.includes('url') || lowerCaseKey.includes('href')) {
    return <a href={value} className='url'>{value}</a>
  }

  return JSON.stringify(value)
}
```