interface SearchBarProps {
  onSearch: (searchQuery: string) => void
  searchTags: string[]
  onRemoveSearchTag: (searchTag: string) => void
}

const SearchBar = ({ onSearch, searchTags, onRemoveSearchTag }: SearchBarProps) => {
  return (
    <>
      <input
        type='search'
        placeholder='Search...'
        onKeyDown={(e) => {
          const target = e.target as HTMLInputElement
          if (e.key === 'Enter' && target.value) {
            onSearch(target.value)

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
