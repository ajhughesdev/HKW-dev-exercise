export interface DataItem {
  [key: string]: any
  customerID: number
  fullName: string
  date: string
  orderNumber: string
  email: string
  orderStatus: string
  clubMember: boolean
  location: string
}

export type SortDirection = 'ascending' | 'descending' | null

export interface SortState {
  column: string | null
  direction: SortDirection
}

export interface Columns {
  [key: string]: string
}

