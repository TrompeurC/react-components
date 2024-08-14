import { FC, ReactNode, memo, useContext } from 'react'
import { CalendarProps } from '.'
import { Dayjs } from 'dayjs'

import cs from 'classnames'
import LocaleContext from './locale/LocaleContext'
import allLocales from './locale'


interface MontchCalendarProps extends CalendarProps {
  selectHandler: (date: Dayjs) => void
  curMonth: Dayjs
}


// 获取月份的所有天数
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

// 渲染函数 渲染月份的天
const renderMonth = (daysInfo: Array<{
  date: Dayjs;
  isCurrentMonth: boolean;
}>, dateRender: CalendarProps['dateRender'],
  dateInnerRender: CalendarProps['dateInnerRender'],
  value: Dayjs,
  selectHandler: MontchCalendarProps['selectHandler']
) => {

  const rows: ReactNode[] = []
  for (let i = 0; i < 6; i++) {
    const row = []
    for (let j = 0; j < 7; j++) {
      const day = daysInfo[i * 7 + j]
      row.push(<div key={day.date.toString()}
        onClick={() => selectHandler(day.date)}
        className={cs('calendar-month-body-cell', day.isCurrentMonth ? 'calendar-month-body-cell-current' : '')}>
        {
          dateRender ? dateRender(day.date) : <>
            <div className={cs('calendar-month-body-cell-value', {
              'calendar-month-body-cell-selected': value.format('YYYY-MM-DD') === day.date.format('YYYY-MM-DD')
            })}>{day.date.date()}</div>
            <div className='calendar-month-body-cell-content'>{dateInnerRender?.(day.date)}</div>
          </>
        }
      </div>)
    }
    rows.push(row)
  }

  return rows.map((row, index) => <div key={index} className='calendar-month-body-row'>{row}</div>)
}



const MonthCalendar: FC<MontchCalendarProps> = memo((props) => {
  const { value, curMonth, dateRender, dateInnerRender, selectHandler } = props
  const localeContext = useContext(LocaleContext)
  const CalendarLocale = allLocales[localeContext.locale]
  const weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  const daysInfo = getAllDays(curMonth)

  return (
    <div className='calendar-month'>
      <div className='calendar-month-header'>
        {weekList.map((week) => (
          <div key={week} className='calendar-month-header-item'>
            {CalendarLocale.week[week]}
          </div>
        ))}
      </div>
      <div className='calendar-month-body'>
        {renderMonth(daysInfo, dateRender, dateInnerRender, value, selectHandler)}
      </div>
    </div>
  )
})

export default MonthCalendar