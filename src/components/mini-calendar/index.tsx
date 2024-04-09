import type { ReactNode } from 'react'
import React ,{ useEffect, useImperativeHandle, useState ,  } from "react"

import classnames from 'classnames'

import "./index.scss"

const monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]

interface CalendarProps {
  value?: Date,
  onChange?: (date: Date) => void
}

interface CalendarRef {
  getDate: () => Date,
  setDate: (date: Date) => void,
}


const MiniCalendar: React.ForwardRefRenderFunction<CalendarRef , CalendarProps > = ((props , ref) => {

  const { value = new Date() , onChange} = props

  useImperativeHandle(ref , () => ({
    getDate: () => date,
    setDate: (date: Date) => setData(date)
  }))

  const [date, setData] = useState(value)

  // 改变月份
  const handleChangeMonth = (value: number) => () => {
    setData(new Date(date.getFullYear(), date.getMonth() + value, 1))
  }
  // 获取当前月的天数
  const getMonthDays = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }
  // 获取当前月的第一天是星期几
  const getFirstDay = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // 渲染日期
  const renderDays = () => {
    const days:ReactNode[] = []
    
    // 获取当前月的天数
    const daysCount = getMonthDays(date.getFullYear(), date.getMonth())
    // 获取当前月的第一天是星期几
    const firstDay = getFirstDay(date.getFullYear(), date.getMonth())
    // 获取上个月的天数
    const prevDaysCount = getMonthDays(date.getFullYear(), date.getMonth() - 1)

    // 上个月的日期
    for (let i = 0; i < firstDay; i++) {
      days.unshift(<div key={days.length} className="day prev-day">{ prevDaysCount - i }</div>)
    }
    // 当前月的日期
    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = onChange?.bind(null, new Date(date.getFullYear(), date.getMonth(), i))
      days.push(<div 
            key={days.length} 
            onClick={clickHandler}
            className={classnames('day', {
            selected: i === date.getDate()
          })} >{i}</div>)
    }
    // 下个月的日期
    let mod = days.length % 7
    mod = mod === 0 ? 7 : (7 - mod + 7)
    let i = 0
    while (mod -- && days.length < 42) {
      days.push(<div key={days.length} className="day next-day">{++i}</div>)
    }
    return days
  }

  useEffect(() => {
    setData(value)
  } , [value])

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handleChangeMonth(-1)} className="calendar-header-btn">&lt;</button>
        <span>{date.getFullYear() + '年' + monthNames[date.getMonth()]}</span>
        <button onClick={handleChangeMonth(+1)} className="calendar-header-btn">&gt;</button>
      </div>
      <div className="calendar-days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {
          renderDays()
        }
      </div>
    </div>
  )
})

export default React.forwardRef(MiniCalendar);