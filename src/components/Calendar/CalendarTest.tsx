import React, { memo, useState } from 'react'
import Calendar from '.'
import dayjs from 'dayjs'

const calendarTest = memo(() => {
  const [date ] = useState(dayjs())
  return (
    <div>
      <Calendar value={date} locale='en-US'
        dateInnerContent={
          (date) => <div>{date.format('YYYY-MM-DD')}
          </div>
        }
      >
      </Calendar>
    </div>
  )
})

export default calendarTest