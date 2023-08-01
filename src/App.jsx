import { useEffect, useState } from 'react'

import SearchBar from './components/SearchBar'
import ColumnToggler from './components/ColumnToggler'
import Table from './components/Table'

import data from './hp-api.json'
import './App.css'


const App = () => {
  const [filteredData, setFilteredData] = useState(data)
  const [hiddenColumns, setHiddenColumns] = useState([])

  const handleSearch = (query) => {
    // TODO - logic for filtering the data based on search query
  }

  const handleToggleColumn = (column) => {
    // TODO - logic to hide or show columns
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ColumnToggler
        columns={[
          'name',
          'dateOfBirth',
          'yearOfBirth',
          'species',
          'house',
          'actor',
          'image',
          'patronus',
        ]}
        onToggle={handleToggleColumn}
      />
      <Table data={filteredData} hiddenColumns={hiddenColumns} />
    </>
  )
}

export default App
