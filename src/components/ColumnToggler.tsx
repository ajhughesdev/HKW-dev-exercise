import React from 'react'

interface ColumnTogglerProps {
  columns: { [key: string]: string }
  onToggle: (key: string) => void
}

const ColumnToggler = ({ columns, onToggle }: ColumnTogglerProps) => {
  return (
    <>
      <h3>Column Settings</h3>
      <div className='column-toggler'>
        {Object.entries(columns).map(([key, value]) => (
          <>
            <label key={key} htmlFor={value}></label>
            {value}
            <input
              type='checkbox'
              id={value}
              defaultChecked
              onChange={() => onToggle(key)}
            />
          </>
        ))}
      </div>
    </>
  )
}

export default ColumnToggler
