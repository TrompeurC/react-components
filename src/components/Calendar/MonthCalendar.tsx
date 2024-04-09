import type { FC } from 'react'
import { CalendarProps } from './index'
import { Dayjs } from 'dayjs'
import classNames from 'classnames';


interface MonthCalendarProps extends CalendarProps {

}
const daysInfo: Array<{date: Dayjs, currentMonth: boolean}> = new Array(6 * 7);
const week = ["日", "一", "二", "三", "四", "五", "六"]

const getAllDay = (date: Dayjs) => {
  const startDate = date.startOf('month')
  const day = startDate.day()

  for(let i = 0 ; i < day; i ++ ) {
    daysInfo[i] = {
      date:startDate.subtract(day - i, 'day'),
      currentMonth: false
    } 
  }
  for(let i = day; i < daysInfo.length; i++) {
    const caleDate = startDate.add(i - day, 'day')
    daysInfo[i] = {
      date: caleDate,
      currentMonth: caleDate.month() === date.month()
    }
  }
  return daysInfo
}

const renderDays = (days: Array<{date: Dayjs , currentMonth: boolean}>) => {
  const rows = []
  for(let i = 0; i < 6 ; i ++) {
    const row = []
    for(let j = 0; j < 7; j ++) {
      const cur = days[i * 7 + j]
      row.push(<div className={
        classNames('calendar-month-body-cell', {
          "calendar-month-body-cell-current": cur.currentMonth
        })
      }>{ cur.date.date() }</div>)
    }
    rows.push(row)
  }
  return rows.map(row => <div className="calendar-month-body-row">{row}</div>)
}

const MonthCalendar:FC<MonthCalendarProps> = ((props) => {

  const days = getAllDay(props.value)
  return (
    <div className='calendar-month'>
      <div className='calendar-month-week-list'>
        {
          week.map(item => (<div key={item} className='calendar-month-week-list-item'>{item}</div>))
        }
      </div>
      <div className='calendar-month-body'>
        {
          renderDays(days)
        }
      </div>
    </div>
  )
})

export default MonthCalendar