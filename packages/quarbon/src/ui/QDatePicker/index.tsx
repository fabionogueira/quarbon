import { forwardRef, useEffect, useRef, useState } from 'react'
import { QCalendar, QField, QList, QMenu, QTextbox } from '@quarbon/ui'
import { CbCalendar } from '@quarbon/icons/cb'
import './QDatePicker.scss'
import { Icon } from '@quarbon/ui/Icon'
import date from '@quarbon/utils/date'

// To do: Ajustar outras funções do DatePicker,
// 1. Adicionar um range - Data de inicio e fim com e sem calendario. (Não tem essa necessidade)
//2. Fazer só o datepicker sem o calendario
// 3. Colocar o calendario para aparecer em outros lados, por exemplo, em cima do datepicker.

/**
 * @doc:component
 */
export const QDatePicker = forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
  const { value, onChange, placeholder, labelText, mask = 'dd/mm/yyyy' } = props
  const [_value, setValue] = useState(value)
  const [show, setShow] = useState(false)
  const textboxRef = useRef<any>(null)

  useEffect(() => {
    setValue(value)
  }, [value])

  function onFocus() {
    // setShow(true)
  }
  function onSelectDate(newDate: any) {
    textboxRef.current.focus()
    setShow(false)
    setValue(date.format(newDate, mask))
  }

  return (
    <>
      <QTextbox ref={textboxRef} name="textbox" value={_value} onFocus={onFocus} append={<CbCalendar size={16} />} />
      <QMenu show={show} anchorRef={textboxRef} onClose={() => setShow(false)}>
        <QCalendar onSelectDate={onSelectDate} />
      </QMenu>
    </>
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
  labelText?: string

  /**
   * @doc:attr
   */
  mask?: string
}
