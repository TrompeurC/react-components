import { Dayjs } from 'dayjs'
import { FC, memo, useContext } from 'react'
import LocaleContext from './locale/LocaleContext'
import allLocales from './locale'


interface CalendarHeaderProps {
  curMonth: Dayjs
  prevMonthHandler: () => void
  nextMonthHandler: () => void
  todayHandler: () => void
}

const CalendarHeader: FC<CalendarHeaderProps> = memo((props) => {
  const { curMonth, prevMonthHandler, nextMonthHandler, todayHandler } = props
  const localeContext = useContext(LocaleContext)
  const locale = allLocales[localeContext.locale]
  return (
    <div className='calendar-header'>
      <div className='calendar-header-l'>
        <div className='calendar-header-l-icon' onClick={prevMonthHandler}>&lt;</div>
        <div className='calendar-header-l-value'>{curMonth.format(locale.formatMonth)}</div>
        <div className='calendar-header-l-icon' onClick={nextMonthHandler}>&gt;</div>
        <button className="calendar-header-l-btn" onClick={todayHandler}>{locale.today}</button>
      </div>
    </div>
  )
})

export default CalendarHeader