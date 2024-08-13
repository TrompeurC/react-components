import { memo } from 'react'
import type { Dayjs } from 'dayjs'
import type { FC } from 'react'
import MonthCalendar from './MonthCalendar'
import CalendarHeader from './CalendarHeader'

import './index.scss'

export interface CalendarProps {
  value: Dayjs
}

const Calendar: FC<CalendarProps> = memo((props) => {
  const { value } = props
  return (
    <div className='calendar'>
      <CalendarHeader {...props} />
      <MonthCalendar {...props} />
    </div>
  )
})

export default Calendar