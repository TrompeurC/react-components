import React, { FC, PropsWithChildren, forwardRef, memo } from 'react'
import cs from 'classnames'

interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  size?: string | string[];
  spin?: boolean
}

export type IconProps = BaseProps & Omit<React.SVGAttributes<SVGElement>, keyof BaseProps>


const getSize = (size: IconProps['size']) => {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[]
  }
  if (typeof size === 'string') {
    const width = (size as string) || '1em'
    const height = size || '1em'
    return [width, height]
  }
}


const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>(memo((prop, ref) => {
  const {
    className,
    style,
    size = '1em',
    spin,
    children,
    ...rest
  } = prop
  const [width, height] = getSize(size)!

  const cn = cs([
    "icon",
    {
      'icon-spin': spin
    },
    className
  ])
  return (
    <svg ref={ref}
      className={cn}
      width={width} height={height} style={style} fill="currentColor" {...rest}>
      {children}
    </svg>
  )
}))

export default Icon