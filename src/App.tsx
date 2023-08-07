import { useEffect, useState } from 'react'

import { camelToTitle, genUniqueId } from './utilities/utilities'
import { Columns, DataItem, SortDirection, SortState } from './types'
import { useFetch } from './hooks/useFetch'

import SearchBar from './components/SearchBar/SearchBar'
import ColumnToggler from './components/ColumnToggler/ColumnToggler'
import Table from './components/Table/Table'

const url = 'https://ajhughesdev.github.io/HKW-dev-exercise/mock_data.json'
const rowsPerPage = 20
const user = 'Steve'

const App = () => {
  const { data, error } = useFetch<DataItem[]>(url)
  const [filteredData, setFilteredData] = useState<DataItem[]>([])
  const [columns, setColumns] = useState<Columns>({})
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([])
  const [sortState, setSortState] = useState<SortState>({ column: null, direction: null })
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [searchTags, setSearchTags] = useState<string[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    if (data) {
      const dataWithIds = data.map((item) => ({
        ...item,
        id: genUniqueId(),
      }))

      setFilteredData(dataWithIds)

      const columnsFromData: Columns = {}
      Object.keys(data[0]).forEach((key) => {
        columnsFromData[key] = camelToTitle(key)
      })
      setColumns(columnsFromData)
    }
  }, [data])

  if (error) return <p>There is an error: {error.message}</p> // TODO #9 create Error component
  if (!data) return <p>Loading...</p> // TODO #8 create Loading component

  const handleSearch = (searchQuery: string) => {
    const trimmedSearchQuery = searchQuery.trim()
    setSearchTags((prevSearchTags) => {
      if (prevSearchTags.includes(trimmedSearchQuery)) {
        return prevSearchTags
      }
      const newSearchTags = [...prevSearchTags, trimmedSearchQuery]
      setFilteredData(
        data.filter((item) =>
          newSearchTags.some((tag) =>
            Object.values(item).some((value) =>
              value.toString().toLowerCase().includes(tag.toLowerCase()),
            ),
          ),
        ),
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
                value.toString().toLowerCase().includes(tag.toLowerCase()),
              ),
            ),
          ),
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
    setHiddenColumns((prevHiddenColumns) => {
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

  const totalPages = Math.ceil(filteredData.length / rowsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
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
        : filteredData.map((item) => item.id.toString()),
    )
  }

  return (
    <>
      <div className='header'>
        <h1>Hi, {isLoggedIn ? user : 'Guest'}</h1>
        <h2>Report</h2>
        <div className='navbar'>
          <div>
            <SearchBar
              onSearch={handleSearch}
              searchTags={searchTags}
              onRemoveSearchTag={(index: string) =>
                handleRemoveSearchTag(index)
              }
            />
          </div>
          <div>
            <ColumnToggler
              columns={columns}
              onToggle={handleToggleColumn}
              hiddenColumns={hiddenColumns}
              onToggleAll={handleToggleAllColumns}
              searchTags={searchTags}
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
        rowsPerPage={rowsPerPage}
      />
      <div className='pagination'>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className='pagination-btn'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='page-btn'
          >
            <g id='Frame'>
              <path
                id='Vector'
                d='M8 12L14 6V18L8 12Z'
                fill='#151718'
              />
            </g>
          </svg>
          <span>Prev</span>
        </button>
        <div className='page-number'>
          {currentPage * rowsPerPage + 1}-
          {Math.min((currentPage + 1) * rowsPerPage, filteredData.length)} of{' '}
          {filteredData.length}
        </div>
        <button
          className='pagination-btn next'
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
        >
          <span>Next</span>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='Frame'>
              <path
                id='Vector'
                d='M8 12L14 6V18L8 12Z'
                fill='#151718'
              />
            </g>
          </svg>
        </button>
      </div>
    </>
  )
}

export default App
