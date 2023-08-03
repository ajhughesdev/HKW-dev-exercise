import { useMemo } from 'react'

import { Columns, DataItem, SortState } from './../types'
import { ReactComponent as SortIcon } from './../assets/sort-icon.svg'

interface TableProps {
  data: DataItem[]
  hiddenColumns: string[]
  sortState: SortState
  onSort: (key: string) => void
  columns: Columns
  currentPage: number
  selectedRows: string[]
  onSelectRow: (selectedId: string) => void
  onSelectAllRows: () => void
}

const Table = ({
  data,
  columns,
  hiddenColumns,
  sortState,
  onSort,
  currentPage,
  selectedRows,
  onSelectRow,
  onSelectAllRows,
}: TableProps) => {
  const sortedData = useMemo(() => {
    let sortableItems = [...data]
    if (sortState.column) {
      sortableItems.sort((a, b) => {
        if (sortState.column && a[sortState.column] < b[sortState.column]) {
          return sortState.direction === 'ascending' ? -1 : 1
        }
        if (sortState.column && a[sortState.column] > b[sortState.column]) {
          return sortState.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [data, sortState])

  const currentPageData = sortedData.slice(
    currentPage * 20,
    (currentPage + 1) * 20,
  )

  return (
    <div className='wrapper'>
      <table border={0} cellPadding={0} cellSpacing={0} width='100%' className='report'>

        <thead className='fixed-header'>
          <tr>
            <th className='checkbox'>
              <input
                type='checkbox'
                onChange={onSelectAllRows}
                checked={selectedRows.length === data.length}
              />
            </th>
            {Object.entries(columns).map(([key, value]) =>
              !hiddenColumns.includes(key) ? (
                <th
                  className='report-header'
                  key={key}
                  onClick={() => onSort(key)}
                >
                  {value}
                  <SortIcon
                    width={12}
                    height={12}
                  />
                </th>
              ) : null,
            )}
          </tr>
        </thead>

        <tbody>
          {currentPageData.map((item) => (
            <tr key={item.customerID}>
              <td className='checkbox'>
                <input
                  type='checkbox'
                  onChange={() => onSelectRow(item.customerID.toString())}
                  checked={selectedRows.includes(item.customerID.toString())}
                />
              </td>
              {Object.entries(columns).map(([key]) => {
                if (!hiddenColumns.includes(key)) {
                  if (key === 'clubMember') {
                    return <td key={key}>{item[key] ? 'Yes' : 'No'}</td>
                  }
                  if (key === 'date') {
                    const date = new Date(item[key])
                    return <td key={key}>{date.toLocaleDateString()}</td>
                  }
                  if (key === 'email') {
                    return <td key={key}><a href={`mailto:${item[key]}`} className='email'>Send email</a></td>
                  }
                  return <td key={key}>{item[key]}</td>
                }
                return null
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )
}

export default Table
