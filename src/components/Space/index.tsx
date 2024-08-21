import React, { useContext, useMemo } from 'react';
import { CSSProperties, FC, memo } from 'react'
import cs from 'classnames'
import './index.scss'
import { ConfigContext } from './ConfigProvider';

export type SizeType = 'small' | 'middle' | 'large' | number | undefined;

export interface SpaceProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
  size?: SizeType | [SizeType, SizeType];
  direction?: "horizontal" | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  wrap?: boolean;
  split?: React.ReactNode;
  children?: React.ReactNode;
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

const getSize = (size: SizeType) => {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}


const Space: FC<SpaceProps> = memo((props) => {
  const { space } = useContext(ConfigContext)

  const {
    className,
    style = {},
    children,
    wrap = false,
    align,
    split,
    direction = 'horizontal',
    size = space?.size || 'small' } = props


  const childNodes = React.Children.toArray(children)
  const nodes = childNodes.map((node, index) => {
    return (
      <>
        <div className='space-item' key={`space-item-${index}`}>
          {node}
        </div>
        {index < childNodes.length - 1 ? <div className={`space-item-split`}>{split}</div> : null}
      </>
    )
  })

  const otherCss: CSSProperties = {}
  const [horizontalSize, verticalSize] = useMemo(() => {
    return (Array.isArray(size) ? size : [size, size] as [SizeType, SizeType]).map(getSize)
  }, [size])

  otherCss.rowGap = horizontalSize;
  otherCss.columnGap = verticalSize;

  const mergedAlign = direction === 'horizontal' && align === undefined ? 'center' : align
  const cn = cs('space', {
    [`space-${direction}`]: direction,
    [`space-align-${mergedAlign}`]: mergedAlign,
    [`space-wrap`]: wrap,
  }, className)
  return (
    <div className={cn} style={{ ...otherCss, ...style }} >
      {nodes}
    </div>
  )
})

export default Space