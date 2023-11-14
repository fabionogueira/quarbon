import { forwardRef, useEffect, useRef, useState } from 'react'
import { QCalendar, QMenu, QTextbox } from '@quarbon/ui'
import { CbCalendar } from '@quarbon/icons/cb'
import './QDatePicker.scss'

/**
 * @doc:component
 */
export const QDatePicker = forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
  const { value, onChange, mask = '####-##-##' } = props
  const [_value, setValue] = useState(value)
  const [focusByClick, setFocusByClick] = useState(false)
  const [show, setShow] = useState(false)
  const textboxRef = useRef<any>(null)

  useEffect(() => {
    setValue(value)
  }, [value])

  function onFocus() {
    setFocusByClick(false)
    if (!focusByClick && !textboxRef.current.cancel) {
      setShow(true)
    }
  }
  function onBlur() {
    setFocusByClick(false)
    if (textboxRef.current.cancel) {
      setShow(false)
    }
    textboxRef.current.cancel = false
  }
  function onMouseDown() {
    setFocusByClick(true)
  }
  function onClick() {
    if (!textboxRef.current.cancel) {
      setShow(true)
    }
    textboxRef.current.cancel = false
  }
  function onSelectDate(newDate: any) {
    textboxRef.current.cancel = true
    textboxRef.current.focus()
    setShow(false)
    setValue(newDate)
    onChange?.(newDate)
  }

  return (
    <div onMouseDown={onMouseDown} onClick={onClick}>
      <QTextbox
        {...props}
        ref={textboxRef}
        mask={mask}
        value={_value}
        onBlur={onBlur}
        onFocus={onFocus}
        append={<CbCalendar size={16} />}
      />
      <QMenu show={show} anchorRef={textboxRef} onClose={() => setShow(false)}>
        <QCalendar value={(_value as any)} onSelectDate={onSelectDate} />
      </QMenu>
    </div>
  )
})
QDatePicker.displayName = 'QDatePicker'
type DatePickerProps = {
  /**
   * @doc:attr
   */
  value?: string

  /**
   * @doc:attr:type event
   */
  onChange?: (date: string) => void

  /**
   * @doc:attr
   */
  placeholder?: string

  /**
   * @doc:attr
   */
  filled?: boolean

  /**
   * @doc:attr
   */
  helperText?: string

  /**
   * @doc:attr:control { "value":"Label" }
   */
  label?:string

  /**
   * @doc:attr
   */
  outlined?:boolean

  /**
   * @doc:attr
   */
  prefix?:string

  /**
   * @doc:attr
   */
  suffix?:string

  /**
   * @doc:attr
   */
  error?:string

  /**
   * @doc:attr:control false
   */
  mask?: string
}
