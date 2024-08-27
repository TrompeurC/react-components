import { FC, ForwardRefRenderFunction, ForwardedRef, forwardRef, useEffect, useImperativeHandle, useMemo } from "react"
import { createPortal } from "react-dom"

export interface PortalProps {
  children: React.ReactNode
  attach?: string | HTMLElement
}

const getAttach = (attach?: PortalProps['attach']) => {
  if (typeof attach === 'string') return document.querySelector(attach)
  if (typeof attach === 'object' && attach instanceof HTMLElement) return attach
  return document.body
}


export const Portal = forwardRef((props: PortalProps, ref) => {
  const { children, attach = document.body } = props
  const container = useMemo(() => {
    const container = document.createElement('div')
    container.classList.add('portal-wrapper')
    return container
  }, [])

  useEffect(() => {
    const parentElement = getAttach(attach)
    parentElement?.appendChild(container)
    return () => {
      parentElement?.removeChild(container)
    }
  }, [container, attach])

  useImperativeHandle(ref, () => container)

  return createPortal(children, container)
})