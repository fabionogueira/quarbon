import {forwardRef, useEffect, useState} from 'react'
import { TBaseProps } from '@quarbon/types'
import { createClassName } from '@quarbon/utils/css'
import { CbChevronLeft, CbChevronRight } from '@quarbon/icons/cb'
import './QCalendar.scss'
import date from "@quarbon/utils/date";

const QCalendarCssMap = {
  disabled: { true: 'q-disabled q-calendar--disabled' },
  bordered: { true: 'q-calendar--bordered' },
  skeleton: { true: 'q-skeleton' },
}
const weekdays = ['S', 'M', 'T', 'W', 'Th', 'F', 'S']
const months: any = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

/**
 * @doc:component
 */
export const QCalendar = forwardRef<HTMLDivElement, TQCalendarProps>((props, ref) => {
  const { onSelectDate, style, value } = props
  const [_value, setValue] = useState(value ? new Date(`${value} 00:00:00`) : null)
  const [viewDate, setViewDate] = useState(_value ?? new Date())
  const css = createClassName(QCalendarCssMap, props, 'q-calendar', { bordered: true })
  const now = new Date()
  const month = viewDate.getMonth()
  const viewYear = viewDate.getFullYear()
  const viewMonth = viewDate.getMonth()
  const valueDay = _value?.getDate()
  const valueMonth = _value?.getMonth()
  const valueYear = _value?.getFullYear()
  const beforeMonth = viewMonth == 0 ? 11 : viewMonth - 1
  const beforeYear = viewMonth == 0 ? viewYear - 1 : viewYear
  const nextMonth = viewMonth == 11 ? 0 : viewMonth + 1
  const nextYear = viewMonth == 11 ? viewYear + 1 : viewYear
  const weekDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysCount = new Date(viewYear, viewMonth + 1, 0).getDate()
  let beforeDay = new Date(viewYear, viewMonth, 0).getDate()
  const days: Array<Record<string, any>> = getDays()
  const nowId = `${now.getFullYear()}.${now.getMonth()}.${now.getDate()}`
  const valueId = `${valueYear}.${valueMonth}.${valueDay}`

  let year = viewDate.getFullYear()

  // #IFDOC
  useEffect(() => {
    const d = date.format((_value as any), "yyyy-mm-dd");
    (props as any).setProps?.({ value: d })
  }, [_value]);
  // #ENDIF

  function getDays(): any[] {
    // dom=0, seg=1, ter=2, qua=3, qui=4, sex=5, sab=6

    const array: any[] = []

    let i: number
    let j = 1

    for (i = weekDay - 1; i >= 0; i--) {
      const id = `${beforeYear}.${beforeMonth}.${beforeDay}`
      array[i] = {
        id,
        day: beforeDay--,
        cls: 'q-calendar__day--prev',
        inc: -1,
      }
    }

    for (i = 1; i <= daysCount; i++) {
      const id = `${viewYear}.${viewMonth}.${i}`
      const today = i == valueDay && viewMonth == valueMonth

      array.push({
        id,
        day: i,
        cls: '',
        inc: 0,
        active: today,
      })
    }

    for (i = array.length; i < 42; i++) {
      const id = `${nextYear}.${nextMonth}.${j}`
      array.push({
        id,
        day: j++,
        cls: 'q-calendar__day--next',
        inc: 1,
      })
    }

    return array
  }
  function setMonthValue(newMonth: number) {
    if (newMonth > 11) {
      newMonth = 0
      year++
    }

    if (newMonth < 0) {
      year--
      newMonth = 11
    }

    viewDate.setFullYear(year)
    viewDate.setMonth(newMonth)
    setViewDate(new Date(viewDate.getTime()))
  }
  function setYearValue(newYear: number) {
    viewDate.setFullYear(newYear)
    setViewDate(new Date(viewDate.getTime()))
  }
  function setDayValue(newDay: number, inc: number) {
    viewDate.setMonth(viewDate.getMonth() + inc)
    viewDate.setDate(newDay)

    const time = new Date(viewDate.getTime())
    setValue(time)
    setViewDate(time)
    onSelectDate?.(date.format(time, "yyyy-mm-dd"))
  }

  return (
    <div className={css} style={style} ref={ref}>
      <div className="row q-calendar__navigation">
        <div
          className="q-clickable q-calendar__button"
          onClick={() => {
            setMonthValue(month - 1)
          }}
        >
          <CbChevronLeft />
        </div>
        <div className="hbox h-align--center v-align--center client">
          <div className="q-clickable q-calendar__button-text" style={{ minWidth: 50, marginRight: 5 }}>
            {months[month]}
          </div>
          <input
            className="q-calendar__input-year"
            type="number"
            value={year}
            onChange={(e: any) => {
              setYearValue(e.target.value)
            }}
          />
        </div>
        <div
          className="q-clickable q-calendar__button"
          onClick={() => {
            setMonthValue(month + 1)
          }}
        >
          <CbChevronRight />
        </div>
      </div>
      <div className="row q-calendar__weekdays">
        {weekdays.map((name, index) => (
          <div key={index}>{name}</div>
        ))}
      </div>
      <div className="q-calendar__days">
        {days.map(({ id, cls, day, inc }) => {
          const cls1 = (id == nowId ? ' q-calendar__day--now' : '') + (id == valueId ? ' q-calendar__day--value' : '')

          return (
            <div
              key={id}
              className={`q-hover ${cls as string}${cls1}`}
              onClick={() => {
                setDayValue(day, inc)
              }}
            >
              {String(day)}
            </div>
          )
        })}
      </div>
    </div>
  )
})
QCalendar.displayName = 'QCalendar'
type TQCalendarProps = TBaseProps & {
  /**
   * @doc:attr:default true
   */
  bordered?: boolean

  /**
   * @doc:attr:type event
   */
  onSelectDate?: (date: string | null) => void

  /**
   * @doc:attr:control { "type":"date" }
   */
  value?: Date | null

  /**
   * @doc:attr:control false
   */
  name?: string

  /**
   * @doc:attr:control false
   */
  rules?: any

  /**
   * @doc:attr
   */
  skeleton?: boolean
}
