import React from 'react'

const SearchBar = ({ onSearch }) => {
  return (
    <>
      <input
        type='search'
        placeholder='Search...'
        onChange={(e) => onSearch(e.target.value)}
      />
    </>
  )
}

export default SearchBar
