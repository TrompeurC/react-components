import React, { memo, useState } from 'react'
import Calendar from '.'
import dayjs from 'dayjs'

const calendarTest = memo(() => {
  const [date ] = useState(dayjs())
  return (
    <div>
      <Calendar value={date}></Calendar>
    </div>
  )
})

export default calendarTest