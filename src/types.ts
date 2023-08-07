export interface DataItem {
  [key: string]: any
}

// Sort typings
export type SortDirection = 'ascending' | 'descending' | null

export interface SortState {
  column: string | null
  direction: SortDirection
}

export interface Columns {
  [key: string]: string
}
