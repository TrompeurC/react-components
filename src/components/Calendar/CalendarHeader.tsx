import { FC, useContext } from "react";
import { Dayjs } from "dayjs";
import LocaleContext from "./LocaleContext";
import allLocales from "./locale";


interface HeaderProps {
  curMonth: Dayjs;
  prevMonthHandler: () => void;
  nextMonthHandler: () => void;
  todayHandler: () => void
}

const CalendarHeader:FC<HeaderProps> = ((props) => {
  const {
    curMonth,
    prevMonthHandler,
    nextMonthHandler,
    todayHandler
  } = props

  const locale = useContext(LocaleContext).locale

  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div className="calendar-header-icon" onClick={prevMonthHandler}>&lt;</div>
        <div className="calendar-header-value">{curMonth.format(allLocales[locale].formatMonth)}</div>
        <div className="calendar-header-icon" onClick={nextMonthHandler}>&gt;</div>
        <button className="calendar-header-btn" onClick={todayHandler}>{ allLocales[locale].today }</button>
      </div>
    </div>
  )
})

export default CalendarHeader