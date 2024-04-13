import React, { PropsWithChildren, forwardRef } from "react"
import cs from 'classnames'

import './indesx.scss'

type BaseIconProps  = {
  className?: string
  style?: React.CSSProperties
  size?: string | string[]
  spin?: boolean

}

const getSize = (size:BaseIconProps['size']) => {
  if(Array.isArray(size) && size.length === 2){
    return size 
  }

  const width =  size || '1em'
  const height = size || '1em'

  return [width , height] as [string, string]
}


export type IconProps = BaseIconProps & Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>

export const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>((props , ref) => {
  const { 
    style,
    className, 
    spin = false, 
    size = '1em',
    children,
    ...rest 
} = props;

const [width , height] = getSize(size)
const cn = cs('icon', {
    "icon-spin": spin
  },
    className
  )
return (
    <svg ref={ref}  className={cn}  width={width} height={height}  style={style} fill="currentColor" {...rest}>
        {children} 
    </svg>
);
})

export default Icon