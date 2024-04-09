import type { Dayjs} from 'dayjs'

import CalendarHeader from './CalendarHeader'
import MonthCalendar from './MonthCalendar'

import './index.scss'

export interface CalendarProps {
  value: Dayjs
}

function Calendar (props: CalendarProps) {

  return (
    <div className='calendar'>
      <CalendarHeader/>
      <MonthCalendar {...props}/>
    </div>
  )
}


export default Calendar