import { useRef } from 'react'

interface SearchBarProps {
  onSearch: (searchQuery: string) => void
  searchTags: string[]
  onRemoveSearchTag: (searchTag: string) => void
}

const SearchBar = ({ onSearch, searchTags, onRemoveSearchTag }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <h2>Reports</h2>
      <input
        className='search-bar'
        ref={inputRef}
        type='search'
        placeholder='Search...'
        onKeyDown={(e) => {
          const target = e.target as HTMLInputElement
          if (e.key === 'Enter' && target.value) {
            onSearch(target.value)
            if (inputRef.current) {
              inputRef.current.value = ''
            }
          }
        }}
      />
      <div>
        {searchTags.map((tag, i) => (
          <span key={i}>
            {tag}
            <button onClick={() => onRemoveSearchTag(tag)}>x</button>
          </span>
        ))}
      </div>
    </>
  )
}

export default SearchBar
