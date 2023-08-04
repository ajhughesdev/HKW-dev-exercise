import { useState } from 'react'
import { ReactComponent as ColumnSettingsIcon } from './../../assets/columns-settings.svg'
import { Columns } from '../../types'
import css from './columnToggler.module.scss'

interface ColumnTogglerProps {
  columns: Columns
  onToggle: (key: string) => void
  hiddenColumns: string[]
  onToggleAll: () => void
  searchTags: string[]
}

const ColumnToggler = ({
  columns,
  onToggle,
  hiddenColumns,
  onToggleAll,
  searchTags
}: ColumnTogglerProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleMouseEnter = () => setIsExpanded(true)
  const handleMouseLeave = () => setIsExpanded(false)

  return (
    <div className={`${css['column-settings']} ${searchTags.length > 0 ? css['has-tags'] : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type='button'
        className={css.button}
        aria-haspopup='true'
        aria-expanded={isExpanded ? 'true' : 'false'}
        aria-label='Column Settings'
      >
        <ColumnSettingsIcon width={20} />
        <h3 className={css.h3}>Column Settings</h3>
      </button>
      <div className={css['column-toggler']}>
        <div className={css['column-toggler-header']}>
          <h4 className={css.h4}>Select Columns</h4>
          <span
            onClick={onToggleAll}
          >
            Select All
          </span>
        </div>
        {Object.entries(columns).map(([key, value]) => (
          <div key={key} className={css['column-toggler-checkbox']}>
            <span>{value}</span>
            <label htmlFor={value} className={css['form-control']}>
              <input
                type='checkbox'
                id={value}
                checked={!hiddenColumns.includes(key)}
                onChange={() => onToggle(key)}
                className={css.checkmark}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColumnToggler
