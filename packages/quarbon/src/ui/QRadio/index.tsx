import { forwardRef, useEffect, useRef, useState } from 'react'
import { TBaseProps } from '@quarbon/types'
import { createClassName } from '@quarbon/utils/css'
import { CbRadioButton, CbRadioButtonChecked } from '@quarbon/icons/cb'

import './QRadio.scss'

const QRadioCssMap = {
  disabled: { true: 'q-disabled q-radio--disabled' },
  iconAlign: { right: 'q-radio--icon-right' },
  skeleton: { true: 'q-skeleton' },
}
const allRadios: any = {}
let indexId = 0

;(window as any).all = allRadios

/**
 * @doc:component
 */
export const QRadio = forwardRef<HTMLLabelElement, TQRadioProps>((props, ref) => {
  const {
    name,
    checked,
    disabled,
    label,
    value,
    iconSize = 24,
    checkedIcon = CbRadioButtonChecked,
    uncheckedIcon = CbRadioButton,
    style,
    onChange,
  } = props

  const [id] = useState(indexId++)
  const [isChecked, setIsChecked] = useState(checked)
  // const ctx = useContext(FormContext);
  const css = createClassName(QRadioCssMap, props, 'row align-center q-radio q-clickable')
  const IconComponent = isChecked ? checkedIcon : uncheckedIcon
  const localRef = useRef<any>(ref)

  if (name) {
    allRadios[id] = {
      unCheck: () => setIsChecked(false),
      name,
    }
  }

  function onChangeInput(event: any) {
    const val = event

    findRadioGroup((localRef as any).current)
    setIsChecked(val)

    if (val && onChange) onChange(value)

    // name && ctx.setValue(name, val, rules);
  }

  function findRadioGroup(input: HTMLInputElement) {
    const parent = input.closest('[data-container]')
    let found = false

    if (!parent) return found

    Array.from(parent.querySelectorAll('[data-qradio-id]')).forEach((el) => {
      const dataId = el.getAttribute('data-qradio-id') as any
      const item = allRadios[dataId]

      if (dataId == id) return

      if (name == el.getAttribute('data-qradio-name')) {
        item?.unCheck()
      }

      found = true
    })

    return found
  }

  useEffect(() => {
    return () => {
      delete allRadios[id]
    }
  }, [])

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  // #IFDOC
  globalThis.setProps?.(props, { ...props, checked: isChecked })
  // #ENDIF

  return (
    <label className={css} style={style} ref={localRef} data-qradio-id={id} data-qradio-name={name}>
      <IconComponent size={iconSize} />
      {label && <span className="q-radio__label">{label}</span>}
      <input
        className="q-radio__input"
        type="radio"
        name={name}
        disabled={disabled}
        checked={isChecked || false}
        value={value}
        onChange={() => onChangeInput(!isChecked)}
      />
    </label>
  )
})
QRadio.displayName = 'QRadio'
type TQRadioProps = TBaseProps & {
  /**
   * @doc:attr
   */
  checked?: boolean

  /**
   * @doc:attr:control false
   */
  checkedIcon?: any

  /**
   * @doc:attr:type string
   * @doc:attr:control { "type":"select", "options":["left", "right"]}
   */
  iconAlign?: 'left' | 'right'

  /**
   * @doc:attr
   */
  iconSize?: number

  /**
   * @doc:attr:type string
   * @doc:attr:control { "value":"Component Label" }
   */
  label?: any

  /**
   * @doc:attr:control false
   */
  name: string

  /**
   * @doc:attr:type event
   */
  onChange?: (event: any) => void

  /**
   * @doc:attr:control false
   */
  rules?: any

  /**
   * @doc:attr
   */
  skeleton?: boolean

  /**
   * @doc:attr:control false
   */
  uncheckedIcon?: any

  /**
   * @doc:attr:type string
   */
  value: string | number
}
