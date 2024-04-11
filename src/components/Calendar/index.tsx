import React, { useState } from 'react'
import type { Dayjs} from 'dayjs'

import CalendarHeader from './CalendarHeader'
import MonthCalendar from './MonthCalendar'

import './index.scss'
import { CSSProperties, ReactNode } from 'react'
import cs from 'classnames'
import LocaleContext from './LocaleContext'
import dayjs from 'dayjs'

export interface CalendarProps {
  value: Dayjs
  className?:string | string[]
  style?: CSSProperties
  dateRender?: (currentDate:Dayjs) => ReactNode
  dateInnerContent?: (currentDate:Dayjs) => ReactNode
  locale?:string
  onChange?: (date:Dayjs) => void
}

function Calendar (props: CalendarProps) {
  const { className , style , locale ,value  , onChange} = props

  const [curDate , setCurData] = useState<Dayjs>(value)
  const [curMonth , setCurMonth] = useState<Dayjs>(value)


  const prevMonthHandler = () => {
    setCurMonth(curMonth.subtract(1, 'month'))
  }
  const nextMonthHandler = () => {
    setCurMonth(curMonth.add(1, 'month'))
  }

  const changeDate = (val:Dayjs) => {
    setCurData(val)
    setCurMonth(val)
    onChange?.(val)
  }
  const todayHandler = () => {
    const today = dayjs()
    changeDate(today)
  }

  // 类名
  const classNames = cs("calendar" ,className )
  // 设置时间
  const clickHandle = (val:Dayjs) => {
    changeDate(val)
  }
  return (
    <LocaleContext.Provider  value={{
      locale: locale || navigator.language
    }}>
        <div className={classNames} style={style} >
          <CalendarHeader 
            curMonth={curMonth} 
            prevMonthHandler={prevMonthHandler} 
            nextMonthHandler={nextMonthHandler}
            todayHandler={todayHandler}
          />
          <MonthCalendar {...props} curMonth={curMonth} value={curDate} clickHandle={clickHandle}/>
        </div>
    </LocaleContext.Provider>
  )
}


export default Calendar