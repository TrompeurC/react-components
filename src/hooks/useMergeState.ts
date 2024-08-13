import { useState , useRef, useEffect, useCallback, SetStateAction} from "react"


const isFunction = (value: unknown) : value is Function  => {
  return typeof value === 'function'
} 


export default function useMergeState<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T,
    value?: T,
    onChange?: (val: T) => void
  }
): [T , React.Dispatch<React.SetStateAction<T>>]{
  const { value: propValue , defaultValue , onChange } = props || {}

  const isFirstRender = useRef(false)
  const [stateValue , setStateValue] = useState(() => {
    if(propValue !== undefined) {
      return propValue
    } else if (defaultValue !== undefined) {
      return defaultValue
    } else {
      return defaultStateValue
    }
  })
  const setState = useCallback((value: SetStateAction<T>) => {
    const res = isFunction(value) ? value(stateValue) : value
    if(propValue === undefined) {
      setStateValue(res);
    }
    onChange?.(res);
  } , [stateValue])

  useEffect(() => {
    if(propValue === undefined && !isFirstRender.current) {
      setStateValue(propValue!)
    }
    isFirstRender.current = false
  } , [propValue])

  const mergeValue = propValue !== undefined ? propValue : stateValue
  return [mergeValue , setState]
}