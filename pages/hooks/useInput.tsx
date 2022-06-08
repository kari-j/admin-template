import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react'

export const useText = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])
  return [value, handler, setValue] as [
    string,
    (e: ChangeEvent<HTMLInputElement>) => void,
    Dispatch<SetStateAction<string>>
  ]
}

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)
  const handler = useCallback(() => {
    setValue(!value)
  }, [])
  return [value, handler, setValue] as [
    boolean,
    () => void,
    Dispatch<SetStateAction<boolean>>
  ]
}

export const useSelect = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)
  const handler = useCallback((e: any) => {
    setValue(e.currentTarget.id)
  }, [])
  return [value, handler, setValue] as [
    string,
    (e: any) => void,
    Dispatch<SetStateAction<string>>
  ]
}
