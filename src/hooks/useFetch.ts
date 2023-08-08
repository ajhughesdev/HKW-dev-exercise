import { useEffect, useReducer, useRef } from 'react'

interface State<T> {
  data?: T
  error?: Error
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }

export function useFetch<T>(url?: string, options?: RequestInit): State<T> {
  const cacheRef = useRef<Cache<T>>({})
  const cancelRequestRef = useRef<boolean>(false)

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  }

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState }
      case 'fetched':
        return { ...initialState, data: action.payload }
      case 'error':
        return { ...initialState, error: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    if (!url) return

    cancelRequestRef.current = false

    const fetchData = async () => {
      dispatch({ type: 'loading' })

      if (cacheRef.current[url]) {
        dispatch({ type: 'fetched', payload: cacheRef.current[url] })
        return
      }

      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = (await response.json()) as T
        cacheRef.current[url] = data

        if (cancelRequestRef.current) return

        dispatch({ type: 'fetched', payload: data })
      } catch (error) {
        if (cancelRequestRef.current) return

        dispatch({ type: 'error', payload: error as Error })
      }
    }

    fetchData()

    return () => {
      cancelRequestRef.current = true
    }
  }, [url])

  return state
}
