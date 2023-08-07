import { useMemo } from 'react'

import { Columns, DataItem, SortState } from '../../types.ts'
import renderCell from '../../utilities/utilities.tsx'
import { ReactComponent as SortIcon } from './../../assets/sort-icon.svg'
import css from './table.module.scss'

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
  rowsPerPage: number
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
  rowsPerPage
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
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage,
  )

  return (
    <div className={css['report-wrapper']}>
      {Object.keys(columns).length === 0 && <div>Loading...</div>}

      <table
        border={0}
        cellPadding={0}
        cellSpacing={0}
        width='100%'
        className={css.report}
      >
        <thead>
          <tr>
            <th className={css.checkbox}>
              <input
                type='checkbox'
                onChange={onSelectAllRows}
                checked={selectedRows.length === data.length}
              />
            </th>
            {Object.entries(columns).map(([key, value]) =>
              !hiddenColumns.includes(key) ? (
                <th
                  key={key}
                  onClick={() => onSort(key)}
                >
                  <span>
                    {value}
                    <SortIcon width={12} height={12} />
                  </span>
                </th>
              ) : null
            )}
            <th className={css['last-column']}></th>
          </tr>
        </thead>

        <tbody>
          {currentPageData.map((item) => (
            <tr
              key={item.id}
            >
              <td className={css.checkbox}>
                <input
                  type='checkbox'
                  onChange={() => onSelectRow(item.id)}
                  checked={selectedRows.includes(item.id)}
                />
              </td>
              {Object.entries(columns).map(([key, value]) => {
                if (!hiddenColumns.includes(key)) {
                  return (
                    <td
                      data-label={value}
                      key={key}
                    >
                      {renderCell(item[key], key)}
                    </td>
                  )
                }
                return null
              })}
              <td className={css['last-column']}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
