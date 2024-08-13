import { FC, ReactNode, memo } from 'react'
import { CalendarProps } from '.'
import { Dayjs } from 'dayjs'
import cs from 'classnames'


interface MontchCalendarProps extends CalendarProps {

}


const getAllDays = (date: Dayjs) => {
  const startDate = date.startOf('month')
  const day = startDate.day()

  const daysInfo: Array<{ date: Dayjs, isCurrentMonth: boolean }> = new Array(6 * 7)
  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, 'day'),
      isCurrentMonth: false
    }
  }

  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, 'day')
    daysInfo[i] = {
      date: calcDate,
      isCurrentMonth: calcDate.month() === date.month()
    }
  }
  return daysInfo
}


const months = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

const MonthCalendar: FC<MontchCalendarProps> = memo((props) => {
  const { value } = props


  const renderMonth = () => {
    const daysInfo = getAllDays(value)
    const rows: ReactNode[] = []
    for (let i = 0; i < 6; i++) {
      const row = []
      for (let j = 0; j < 7; j++) {
        const day = daysInfo[i * 7 + j]
        row.push(<div key={day.date.toString()} className={cs('calendar-month-body-cell', day.isCurrentMonth ? 'calendar-month-body-cell-current' : '')}>
          {day.date.date()}
        </div>)
      }
      rows.push(row)
    }

    return rows.map((row, index) => <div key={index} className='calendar-month-body-row'>{row}</div>)
  }

  return (
    <div className='calendar-month'>
      <div className='calendar-month-header'>
        {months.map((month) => (
          <div key={month} className='calendar-month-header-item'>
            {month}
          </div>
        ))}
      </div>
      <div className='calendar-month-body'>
        {renderMonth()}
      </div>
    </div>
  )
})

export default MonthCalendar