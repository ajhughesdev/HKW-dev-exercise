import { useState } from 'react'

import { Columns, DataItem, SortDirection, SortState } from './types'
import SearchBar from './components/SearchBar'
import ColumnToggler from './components/ColumnToggler'
import Table from './components/Table'

import data from './mock_data.json'

const columns: Columns = {
  customerID: 'ID',
  fullName: 'Full Name',
  date: 'Date',
  orderNumber: 'Order Number',
  email: 'Email',
  orderStatus: 'Order Status',
  clubMember: 'Club Member',
  location: 'Location',
}

const App = () => {
  const [filteredData, setFilteredData] = useState<DataItem[]>(data)
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([])
  const [sortState, setSortState] = useState<SortState>({ column: null, direction: null })
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [searchTags, setSearchTags] = useState<string[]>([])

  const handleSearch = (searchQuery: string) => {
    const trimmedSearchQuery = searchQuery.trim()
    setSearchTags((prevSearchTags) => {
      if (prevSearchTags.includes(trimmedSearchQuery)) {
        // If the search query already exists in the tags, do nothing
        return prevSearchTags
      }
      const newSearchTags = [...prevSearchTags, trimmedSearchQuery]
      setFilteredData(
        data.filter((item) =>
          newSearchTags.some((tag) =>
            Object.values(item).some((value) =>
              value.toString().toLowerCase().includes(tag.toLowerCase())
            )
          )
        )
      )
      return newSearchTags
    })
    setCurrentPage(0)
  }

  const handleRemoveSearchTag = (searchTag: string) => {
    setSearchTags((prevSearchTags) => {
      const newSearchTags = prevSearchTags.filter((tag) => tag !== searchTag)
      if (newSearchTags.length > 0) {
        setFilteredData(
          data.filter((item) =>
            newSearchTags.some((tag) =>
              Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(tag.toLowerCase())
              )
            )
          )
        )
      } else {
        setFilteredData(data)
      }
      return newSearchTags
    })
  }

  const handleToggleColumn = (toggledColumn: string) => {
    setHiddenColumns((prevHiddenColumns) => {
      if (prevHiddenColumns.includes(toggledColumn)) {
        return prevHiddenColumns.filter((c) => c !== toggledColumn)
      } else {
        return [...prevHiddenColumns, toggledColumn]
      }
    })
  }

  const handleToggleAllColumns = () => {
    setHiddenColumns(prevHiddenColumns => {
      if (prevHiddenColumns.length === 0) {
        return Object.keys(columns).map((key) => key)
      } else {
        return []
      }
    })
  }

  const handleSort = (sortedColumn: string) => {
    setSortState((prevSortState) => {
      let direction: SortDirection = 'ascending'
      if (
        prevSortState.column === sortedColumn &&
        prevSortState.direction === 'ascending'
      ) {
        direction = 'descending'
      }
      return { column: sortedColumn, direction }
    })
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
  }

  const handleSelectRow = (selectedId: string) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(selectedId)) {
        return prevSelectedRows.filter((rowId) => rowId !== selectedId)
      } else {
        return [...prevSelectedRows, selectedId]
      }
    })
  }

  const handleSelectAllRows = () => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.length === filteredData.length
        ? []
        : filteredData.map((item) => item.customerID.toString()),
    )
  }

  return (
    <>
      <div className='header'>
        <h1>Hi, Steve</h1>
        <div className='navbar'>
          <div>
            <SearchBar onSearch={handleSearch} searchTags={searchTags} onRemoveSearchTag={(index: string) => handleRemoveSearchTag(index)} />
          </div>
          <div>
            <ColumnToggler
              columns={columns}
              onToggle={handleToggleColumn}
              hiddenColumns={hiddenColumns}
              onToggleAll={handleToggleAllColumns}
            />
          </div>
        </div>
      </div>

      <Table
        data={filteredData}
        hiddenColumns={hiddenColumns}
        columns={columns}
        sortState={sortState}
        onSort={handleSort}
        currentPage={currentPage}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        onSelectAllRows={handleSelectAllRows}
      />

      <div className='pagination'>
        <button onClick={handlePreviousPage}>Previous</button>
        <div className='page-number'>
          {currentPage * 20 + 1} -{' '}
          {Math.min((currentPage + 1) * 20, filteredData.length)} of{' '}
          {filteredData.length}
        </div>
        <button className='next' onClick={handleNextPage}>Next</button>
      </div>
    </>
  )
}

export default App
