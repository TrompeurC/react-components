import React, { useEffect, useLayoutEffect, useRef } from "react";
import useMutateObserver from "../../hooks/useMutateObserver";

interface MutateObserverProps {
  children: React.ReactElement;
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void;
  options?: MutationObserverInit
}


function MutateObserver(props: MutateObserverProps) {
  const { children, onMutate = () => { }, options } = props

  const elementRef = useRef<HTMLElement>(null)
  const [target, setTarget] = React.useState<HTMLElement>();
  useMutateObserver(target!, onMutate, options);
  useLayoutEffect(() => {
    setTarget(elementRef.current!);
  }, []);

  if (!children) {
    return null;
  }

  return React.cloneElement(children, { ref: elementRef })

}

export default MutateObserver