import { useContext, type FC } from 'react'
import { CalendarProps } from './index'
import { Dayjs } from 'dayjs'
import classNames from 'classnames';
import LocaleContext from './LocaleContext';
import allLocales from './locale';


interface MonthCalendarProps extends CalendarProps {
  clickHandle?( date: Dayjs ):void
  curMonth: Dayjs
}
const daysInfo: Array<{date: Dayjs, currentMonth: boolean}> = new Array(6 * 7);
const week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

// 获取当前月的日期
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



const MonthCalendar:FC<MonthCalendarProps> = ((props) => {
  const { dateRender , dateInnerContent , value ,clickHandle , curMonth  } = props

  // 获取locale的Context
  const localeContext = useContext(LocaleContext)
  const CalendarLocale = allLocales[localeContext.locale];


  // 渲染函数
const renderDays = (days: Array<{date: Dayjs , currentMonth: boolean}> ,
  ) => {
const rows = []
for(let i = 0; i < 6 ; i ++) {
  const row = []
  for(let j = 0; j < 7; j ++) {
    const cur = days[i * 7 + j]
    row.push( 
    (
      <div className={
        classNames('calendar-month-body-cell', {
          "calendar-month-body-cell-current": cur.currentMonth
        })
      }>
        {
          dateRender ? dateRender(cur.date)  : (
          <div className="calendar-month-body-cell-date" onClick={() => clickHandle?.(cur.date)}>
            <div 
              className={classNames("calendar-month-body-cell-date-value",
              { "calendar-month-body-cell-date-selected": value.format("YYYY-MM-DD") === cur.date.format("YYYY-MM-DD")  }
            )}>{cur.date.date()}</div>
            <div className="calendar-month-body-cell-date-content">{dateInnerContent?.(cur.date)}</div>
          </div>
          )
        }
      </div>
    ))
  }
  rows.push(row)
}
return rows.map((row,index) => <div className="calendar-month-body-row" key={index}>{row}</div>)
}

  const days = getAllDay(curMonth)
  return (
    <div className='calendar-month'>
      <div className='calendar-month-week-list'>
        {
          week.map(item => (
            <div key={item} className='calendar-month-week-list-item'>
              {
                CalendarLocale['week'][item]
              }
            </div>))
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