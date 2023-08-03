import { useRef, useState } from 'react'

import { ReactComponent as CloseBtn } from './../assets/close-btn.svg'

interface SearchBarProps {
  onSearch: (searchQuery: string) => void
  searchTags: string[]
  onRemoveSearchTag: (searchTag: string) => void
}

const SearchBar = ({ onSearch, searchTags, onRemoveSearchTag }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <div>
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
      </div>
      <div className={`search-tags ${searchTags.length > 0 ? '' : 'empty'}`}>
        {searchTags.map((tag, i) => (
          <div key={i} className='search-tag'>
            <span>
              <span>Showing results for <span className='tag'>{tag}</span></span>
            </span>
            <button onClick={() => onRemoveSearchTag(tag)}><CloseBtn width={20} /></button>
          </div>
        ))}
      </div>
    </>
  )
}

export default SearchBar
