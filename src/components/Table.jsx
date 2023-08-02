import { useMemo } from 'react'
import { ReactComponent as SortIcon } from './../assets/sort-icon.svg'

const Table = ({
  data,
  hiddenColumns,
  sortState,
  onSort,
  columns,
  currentPage,
  selectedRows,
  onSelectRow,
  onSelectAllRows,
}) => {
  const sortedData = useMemo(() => {
    let sortableItems = [...data]
    if (sortState !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortState.column] < b[sortState.column]) {
          return sortState.direction === 'ascending' ? -1 : 1
        }
        if (a[sortState.column] > b[sortState.column]) {
          return sortState.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [data, sortState])

  const currentPageData = sortedData.slice(
    currentPage * 15,
    (currentPage + 1) * 15,
  )

  return (
    <table className='report'>
      <thead>
        <tr>
          <th className='checkbox'><input type="checkbox" onChange={onSelectAllRows} checked={selectedRows.length === data.length} /></th>
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
            <td><input type="checkbox" onChange={() => onSelectRow(item.customerID)} checked={selectedRows.includes(item.customerID)} /></td>
            {Object.entries(columns).map(([key, value]) => {
              if (!hiddenColumns.includes(key)) {
                if (key === 'clubMember') {
                  return <td key={key}>{item[key] ? 'Yes' : 'No'}</td>
                }
                if (key === 'date') {
                  const date = new Date(item[key])
                  return <td key={key}>{date.toLocaleDateString()}</td>
                }
                return <td key={key}>{item[key]}</td>
              }
              return null
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
