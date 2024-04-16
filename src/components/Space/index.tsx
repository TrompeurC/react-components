
import React, { Fragment, useContext, useMemo } from "react"
import classNames from "classnames"

import './index.scss'
import { ConfigContext } from "./ConfigProvider"

export type SizeType = number | 'small' | 'middle' | 'large' | undefined

interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  style?: React.CSSProperties
  // 分割符
  split?: React.ReactNode
  // 间距
  size?: SizeType | [SizeType, SizeType]
  // 间距方向
  direction?: 'horizontal' | 'vertical'
  // 是否换行
  wrap?: boolean
  // 对齐方式
  align?: 'start' | 'end' | 'center' | 'baseline'
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
}
const getNumberSize = (size: SizeType) => {
  return typeof size === 'string' ? spaceSize[size] : size || 0
}


const Space: React.FC<SpaceProps> = ((props) => {
  const { space } = useContext(ConfigContext)
  const {
    className,
    style,
    children,
    size = space?.size || 'small',
    direction = 'horizontal',
    align,
    split,
    wrap = false,
    ...otherProps
  } = props

  // 对children 进行扁平化处理
  const childrenNodes = React.Children.toArray(children)

  // 渲染的node节点
  const nodes = childrenNodes.map((child: any, index) => {
    const key = child && child.key || `space-item-${index}`
    return (<Fragment key={key}>
      <div className="space-item"> {child} </div>
      {
        index < childrenNodes.length - 1 && split && <div className={`${className}-split`} key={`split-${key}`}>{split}</div>
      }
    </Fragment>)
  })

  const mergedAlign = direction === 'horizontal' && align === undefined ? 'middle' : align

  const cn = classNames([
    'space',
    `space-${direction}`,
    {
      [`space-align-${mergedAlign}`]: mergedAlign,
    },
    classNames
  ])
  const otherStyle: React.CSSProperties = {}
  const [horizontalSize, verticalSize] = useMemo(
    () => ((Array.isArray(size) ? size : [size, size]) as [SizeType, SizeType]).map(item => getNumberSize(item)),
    [size]
  )

  otherStyle.columnGap = horizontalSize
  otherStyle.rowGap = verticalSize

  if (wrap) {
    otherStyle.flexWrap = 'wrap'
  }

  return (
    <div className={cn} style={{ ...style, ...otherStyle }} {...otherProps} >
      {nodes}
    </div>
  )
})

export default Space