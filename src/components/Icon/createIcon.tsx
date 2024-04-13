import { forwardRef } from 'react';

import Icon, { IconProps } from "."

interface CreateIconProps {
  content: React.ReactNode
  iconProps?: IconProps
  viewBox?: string
}

export const createIcon = ((props:CreateIconProps) => {
  const { content , viewBox = "0 0 1024 1024", iconProps = {} } = props
  return forwardRef<SVGSVGElement , IconProps>((props , ref) => {
    return (
      <Icon ref={ref} viewBox={viewBox} {...iconProps} {...props}>
        {content}
      </Icon>  
    )
  })
})

export default createIcon