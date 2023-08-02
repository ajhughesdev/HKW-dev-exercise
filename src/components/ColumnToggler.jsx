const ColumnToggler = ({ columns, onToggle }) => {
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
