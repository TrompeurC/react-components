import React, { forwardRef, useEffect, useImperativeHandle, useMemo } from "react"
import { createPortal } from "react-dom"

interface PortalProps {
  attach?: HTMLElement | string
  children?: React.ReactNode
}
const getAttach = (attach?: PortalProps['attach']) => {
  if (typeof attach === 'string') {
    return document.querySelector(attach)
  }
  if (typeof attach === 'object' && attach instanceof window.HTMLElement) {
    return attach
  }

  return document.body
}

const Portal = forwardRef((props: PortalProps, ref) => {

  const { children, attach } = props
  const container = useMemo(() => {
    const el = document.createElement('div');
    el.classList.add('portal-wrapper')
    return el
  }, [])

  useEffect(() => {
    const target = getAttach(attach)
    target?.appendChild(container)
    return () => {
      target?.removeChild(container)
    }
  }, [attach, container])

  useImperativeHandle(ref, () => container)
  return (
    createPortal(children, container)
  )
})

export default Portal