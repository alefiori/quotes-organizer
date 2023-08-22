import { useRef, useEffect } from 'react'

export const useDebounce = () => {
  const timeout = useRef<NodeJS.Timeout>()

  const debounce =
    <T>(func: (..._: Array<T>) => void, wait: number) =>
    (...args: Array<T>) => {
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => func(...args), wait)
    }

  useEffect(() => () => timeout.current && clearTimeout(timeout.current), [])

  return { debounce }
}
