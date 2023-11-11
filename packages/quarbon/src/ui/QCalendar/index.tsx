import { forwardRef, useState } from 'react'
import { TBaseProps } from '@quarbon/types'
import { createClassName } from '@quarbon/utils/css'
// import { QFormContext } from '@quarbon/ui/QForm/QFormContext'
import { CbCaretDown, CbCaretUp, CbChevronLeft, CbChevronRight } from '@quarbon/icons/cb'
import './QCalendar.scss'

type TQCalendarProps = TBaseProps & {
  checked?: boolean
  onSelectDate?: (date: Date) => void
  value?: Date
  name?: string
  rules?: any
  skeleton?: boolean
}

const QCalendarCssMap = {
  disabled: { true: 'q-disabled q-calendar--disabled' },
  skeleton: { true: 'q-skeleton' },
}
const weekdays = ['S', 'M', 'T', 'W', 'Th', 'F', 'S']
const monthes: any = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'Juny',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

export const QCalendar = forwardRef<HTMLDivElement, TQCalendarProps>((props, ref) => {
  const { onSelectDate, style, value = new Date() } = props

  const [viewDate, setViewDate] = useState(value)
  // const ctx = useContext(QFormContext)
  const css = createClassName(QCalendarCssMap, props, 'q-calendar')
  const days: Array<Record<string, any>> = getDays()
  const month = viewDate.getMonth()
  let year = viewDate.getFullYear()

  function getDays(): any[] {
    // dom=0, seg=1, ter=2, qua=3, qui=4, sex=5, sab=6

    const array: any[] = []
    const viewYear = viewDate.getFullYear()
    const viewMonth = viewDate.getMonth()
    const activeDay = value.getDate()
    const activeMonth = value.getMonth()
    const weekDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysCount = new Date(viewYear, viewMonth + 1, 0).getDate()

    let beforeDay = new Date(viewYear, viewMonth, 0).getDate()
    let i: number
    let j = 1

    for (i = weekDay - 1; i >= 0; i--) array[i] = { day: beforeDay--, cls1: '--prev', inc: -1 }
    for (i = 1; i <= daysCount; i++) {
      const today = i == activeDay && viewMonth == activeMonth

      array.push({
        day: i,
        cls1: today ? '--today' : '',
        // cls2: today ? "--today" : "",
        inc: 0,
        active: today,
      })
    }
    for (i = array.length; i < 42; i++) array.push({ day: j++, cls1: '--next', inc: 1 })

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
    setViewDate(new Date(viewDate.getTime()))
    if (onSelectDate) {
      onSelectDate(viewDate)
    }
  }

// function onChangeInput(event: any) {
  //   // let val = event;
  //   // setIsChecked(val);
  //   // onChange && onChange(val);
  //   // name && ctx?.setValue(name, val);
  // }

  // #IFDOC
  // globalThis.setProps?.(props, {...props, checked:isChecked });
  // #ENDIF

  return (
    <div className={css} style={style} ref={ref}>
      <div className="row q-calendar__navigation">
        <div
          className="q-clickable q-calendar__button"
          onClick={() => {
            setMonthValue(month - 1)
          }}
        >
          <CbChevronLeft style={{ marginRight: '60px' }} />
        </div>
        <div className="q-clickable q-calendar__button-text" style={{ minWidth: 50, marginRight: 5 }}>
          {monthes[month]}
        </div>
        <div className="q-clickable q-calendar__button-text">{year}</div>
        <div className="q-calendar__button-year">
          <div
            className="q-clickable q-calendar__button-year__icons"
            onClick={() => {
              setYearValue(year + 1)
            }}
          >
            <CbCaretUp />
          </div>
          <div
            className="q-clickable q-calendar__button-year__icons"
            onClick={() => {
              setYearValue(year - 1)
            }}
          >
            <CbCaretDown />
          </div>
        </div>
        <div
          className="q-clickable q-calendar__button"
          onClick={() => {
            setMonthValue(month + 1)
          }}
        >
          <CbChevronRight style={{ marginLeft: '60px' }} />
        </div>
      </div>

      <div className="row q-calendar__weekdays">
        {weekdays.map((name) => (
          <div key={name}>{name}</div>
        ))}
      </div>

      <div className="q-calendar__days">
        {days.map(({ cls1, day, inc }, index) => (
          <div
            key={index}
            className={`q-hover q-calendar__day${cls1 as string} ${props.value && props.value.getDate() === day ? 'selected' : ''}`}
            onClick={() => {
              setDayValue(day, inc)
            }}
          >
            {String(day)}
          </div>
        ))}
      </div>
    </div>
  )
})

QCalendar.displayName = 'Calendar'
