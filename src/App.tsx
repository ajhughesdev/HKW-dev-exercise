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
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  })
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
      setIsLoggedIn(true)

      const columnsFromData: Columns = {}
      Object.keys(dataWithIds[0]).forEach((key) => {
        columnsFromData[key] = camelToTitle(key)
      })
      setColumns(columnsFromData)
    }
  }, [data, setColumns])

  if (error) return <p>There is an error: {error.message}</p> // TODO #9 create Error component
  if (!data) return <p>Loading...</p> // TODO #8 create Loading component

  const handleSearch = (searchQuery: string) => {
    const trimmedSearchQuery = searchQuery.trim()
    setSearchTags((prevSearchTags) => {
      if (prevSearchTags.includes(trimmedSearchQuery)) {
        return prevSearchTags
      }
      const newSearchTags = [...prevSearchTags, trimmedSearchQuery]
      const filteredDataWithIds = data
        .filter((item) =>
          newSearchTags.some((tag) =>
            Object.values(item).some((value) =>
              value.toString().toLowerCase().includes(tag.toLowerCase())
            )
          )
        )
        .map((item) => ({ ...item, id: genUniqueId() }))
      setFilteredData(filteredDataWithIds)
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
        setFilteredData(data.map((item) => ({ ...item, id: genUniqueId() })))
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
        : filteredData.map((item) => item.id.toString())
    )
  }

  const convertToCSV = (
    data: DataItem[],
    excludedColumns: string[] = []
  ): string => {
    const replacer = (key: string, value: any) => (value === null ? '' : value)
    const header = Object.keys(data[0]).filter(
      (key) => !excludedColumns.includes(key)
    )
    const csv = [
      header.join(','),
      ...data.map((row) =>
        header
          .map((fieldName) => JSON.stringify(row[fieldName], replacer))
          .join(',')
      ),
    ].join('\r\n')
    return csv
  }

  const handleExportToCSV = () => {
    const selectedData = filteredData.filter((row) =>
      selectedRows.includes(row.id.toString())
    )
    const columnsToExclude = ['id', ...hiddenColumns]
    const csv = convertToCSV(selectedData, columnsToExclude)

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'selected_data.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <>
      <div className='header'>
        <h1>Hi, {isLoggedIn ? user : 'Guest'}</h1>
        <h2>Report</h2>
        <div className='navbar'>
          <div className='navbar-left'>
            <SearchBar
              onSearch={handleSearch}
              searchTags={searchTags}
              onRemoveSearchTag={(index: string) =>
                handleRemoveSearchTag(index)
              }
            />
            <button className='export-btn' onClick={handleExportToCSV}>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10.8327 8.33333H14.9993L9.99935 13.3333L4.99935 8.33333H9.16602V2.5H10.8327V8.33333ZM3.33268 15.8333H16.666V10H18.3327V16.6667C18.3327 17.1269 17.9596 17.5 17.4993 17.5H2.49935C2.03912 17.5 1.66602 17.1269 1.66602 16.6667V10H3.33268V15.8333Z'
                  fill='#535557'
                />
              </svg>
              Download Report
            </button>
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
              <path id='Vector' d='M8 12L14 6V18L8 12Z' fill='#151718' />
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
              <path id='Vector' d='M8 12L14 6V18L8 12Z' fill='#151718' />
            </g>
          </svg>
        </button>
      </div>
    </>
  )
}

export default App
