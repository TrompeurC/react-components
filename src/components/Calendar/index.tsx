import { memo, useState } from 'react'
import type { Dayjs } from 'dayjs'
import type { CSSProperties, FC, ReactNode } from 'react'
import cs from 'classnames'
import MonthCalendar from './MonthCalendar'
import CalendarHeader from './CalendarHeader'

import './index.scss'
import classNames from 'classnames'
import LocaleContext from './locale/LocaleContext'
import dayjs from 'dayjs'

export interface CalendarProps {
  value: Dayjs
  className?: string | string[]
  style?: CSSProperties
  dateRender?: (date: Dayjs) => ReactNode
  dateInnerRender?: (date: Dayjs) => ReactNode
  locale?: string
  onChange?: (value: Dayjs) => void
}

const Calendar: FC<CalendarProps> = memo((props) => {
  const { value, className, style, onChange } = props
  const [curValue, setCurValue] = useState<Dayjs>(value);
  const [curMonth, setCurMonth] = useState<Dayjs>(value)
  const changeDay = (date: Dayjs) => {
    setCurValue(date)
    setCurMonth(date)
    onChange?.(date)
  }
  const selectHandler = (date: Dayjs) => {
    changeDay(date)
  }

  const todayHandler = () => {
    const date = dayjs()
    changeDay(date)
  }

  const prevMonthHandler = () => {
    setCurMonth(curMonth.subtract(1, 'month'))
  }
  const nextMonthHandler = () => {
    setCurMonth(curMonth.add(1, 'month'))
  }

  return (
    <LocaleContext.Provider value={{
      locale: props.locale || navigator.language
    }}>
      <div className={cs('calendar', className)} style={style}>
        <CalendarHeader curMonth={curMonth} todayHandler={todayHandler} prevMonthHandler={prevMonthHandler} nextMonthHandler={nextMonthHandler} />
        <MonthCalendar {...props} value={curValue} curMonth={curMonth} selectHandler={selectHandler} />
      </div>
    </LocaleContext.Provider>

  )
})

export default Calendar