import { createContext, useEffect, useState, ReactNode } from 'react'

// Define a type for your context state
type UserContextType = {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
  currentUser: Record<string, any>
  setCurrentUser: (currentUser: Record<string, any>) => void
  companyType: string
  setCompanyType: (companyType: string) => void
  userMeta: Record<string, any>
  setUserMeta: (userMeta: Record<string, any>) => void
  rowsPerPage: number
  setRowsPerPage: (rowsPerPage: number) => void
  isWOModalOpen: boolean
  setWOModalOpen: (isWOModalOpen: boolean) => void
  url: string
  setUrl: (url: string) => void
  newsletter: any[]
  formBox: string
  setFormBox: (formBox: string) => void
  repairFormBox: string
  setRepairFormBox: (repairFormBox: string) => void
  repairBulkFormBox: string
  setRepairBulkFormBox: (repairBulkFormBox: string) => void
  companyId: string
  setCompanyId: (companyId: string) => void
}

// Create the context with an initial value
export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  currentUser: {},
  setCurrentUser: () => {},
  companyType: '',
  setCompanyType: () => {},
  userMeta: {},
  setUserMeta: () => {},
  rowsPerPage: 20,
  setRowsPerPage: () => {},
  isWOModalOpen: false,
  setWOModalOpen: () => {},
  url: '',
  setUrl: () => {},
  newsletter: [],
  formBox: '',
  setFormBox: () => {},
  repairFormBox: '',
  setRepairFormBox: () => {},
  repairBulkFormBox: '',
  setRepairBulkFormBox: () => {},
  companyId: '',
  setCompanyId: () => {},
})

type UserProviderProps = {
  children: ReactNode
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [companyType, setCompanyType] = useState('')
  const [userMeta, setUserMeta] = useState({})
  const [url, setUrl] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [isWOModalOpen, setWOModalOpen] = useState(false)
  const [formBox, setFormBox] = useState('')
  const [repairFormBox, setRepairFormBox] = useState('')
  const [repairBulkFormBox, setRepairBulkFormBox] = useState('')
  const [companyId, setCompanyId] = useState('')

  useEffect(() => {
    if (isLoggedIn) {
      setLoggedIn(isLoggedIn)
      setCurrentUser(currentUser)
      setCompanyId(companyId)
      setCompanyType(companyType)
      setUserMeta(userMeta)
      setFormBox(formBox)
      setRepairFormBox(repairFormBox)
      setRepairBulkFormBox(repairBulkFormBox)
    }

    setUrl('https://customer-portal.local/wp-admin/admin-ajax.php')
  }, [])

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn: setLoggedIn,
        currentUser,
        setCurrentUser,
        companyType,
        setCompanyType,
        userMeta,
        setUserMeta,
        rowsPerPage,
        setRowsPerPage,
        isWOModalOpen,
        setWOModalOpen,
        url,
        setUrl,
        newsletter: [],
        formBox,
        setFormBox,
        repairFormBox,
        setRepairFormBox,
        repairBulkFormBox,
        setRepairBulkFormBox,

        companyId,
        setCompanyId,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
