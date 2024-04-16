import React, { FC, memo, useLayoutEffect } from 'react'
import useMutateObserver from '../../hooks/useMutateObserver'

interface MutateObserverProps {
  options?: MutationObserverInit
  onMutate?: MutationCallback
  children: React.ReactElement
}


const MutateObserver: FC<MutateObserverProps> = ((props) => {
  const { options, onMutate = () => { }, children } = props

  const elementRef = React.useRef<HTMLElement>(null);

  const [target, setTarget] = React.useState<HTMLElement>();

  useMutateObserver(target!, onMutate, options);

  useLayoutEffect(() => {
    setTarget(elementRef.current!);
  }, []);

  useMutateObserver(target!, onMutate, options)

  if (!children) {
    return null;
  }
  return React.cloneElement(children, { ref: elementRef });
})

export default MutateObserver