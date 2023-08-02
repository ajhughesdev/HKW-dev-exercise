import React, { useState } from 'react'

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

  const handleSearch = (searchQuery: string) => {
    setFilteredData(
      data.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      ),
    )
    setCurrentPage(0)
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
    <div>
      <SearchBar onSearch={handleSearch} />
      <ColumnToggler
        columns={columns}
        onToggle={handleToggleColumn}
      />
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
        <div>
          {currentPage * 20 + 1} -{' '}
          {Math.min((currentPage + 1) * 20, filteredData.length)} of{' '}
          {filteredData.length}
        </div>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  )
}

export default App
