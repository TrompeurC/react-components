import { FC, memo } from 'react'
import { CalendarProps } from '.'


interface CalendarHeaderProps extends CalendarProps {

}

const CalendarHeader: FC<CalendarHeaderProps> = memo(() => {
  return (
    <div className='calendar-header'>
      <div className='calendar-header-l'>
        <div className='calendar-header-l-icon'>&lt;</div>
        <div className='calendar-header-l-value'>2023 年 11 月</div>
        <div className='calendar-header-l-icon'>&gt;</div>
        <button className="calendar-header-l-btn">今天</button>
      </div>
    </div>
  )
})

export default CalendarHeader