import { forwardRef, useContext, useEffect, useState } from 'react'
import { SvgIcon } from '@quarbon/utils/svgicon'
import { TBaseProps } from '@quarbon/types'
import { createClassName } from '@quarbon/utils/css'
import { CbCheckbox, CbCheckboxCheckedFilled, CbCheckboxIndeterminateFilled } from '@quarbon/icons/cb'
import { QFormContext } from '@quarbon/ui/QForm/QFormContext'
import './QCheckbox.scss'

SvgIcon.set('q-checkbox-error', {
  content:
    '<svg><path fill="currentColor" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>',
  viewBox: '0 0 24 24',
})

const QCheckboxCssMap = {
  disabled: { true: 'q-disabled q-checkbox--disabled' },
  iconAlign: { right: 'q-checkbox--icon-right' },
  skeleton: { true: 'q-skeleton' },
  uncheckedHide: { true: 'q-checkbox--unchecked-hide' },
}

/**
 * @doc:component
 */
export const QCheckbox = forwardRef<HTMLLabelElement, TQCheckboxProps>((props, ref) => {
  const {
    name,
    checked,
    disabled,
    label,
    iconSize = 24,
    checkedIcon = CbCheckboxCheckedFilled,
    uncheckedIcon = CbCheckbox,
    undeterminedIcon = CbCheckboxIndeterminateFilled,
    style,
    onChange,
  } = props

  const [isChecked, setIsChecked] = useState(checked)
  const ctx = useContext(QFormContext)
  const css = createClassName(
    QCheckboxCssMap,
    props,
    `row align-center q-checkbox q-clickable${isChecked ? ' q-checkbox--checked' : ''}`,
  )
  const Component = isChecked === true ? checkedIcon : isChecked === false ? uncheckedIcon : undeterminedIcon

  function onChangeInput(event: any) {
    const val = event

    setIsChecked(val)
    onChange && onChange(val)
    name && ctx?.setValue(name, val)
  }

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  // #IFDOC
  globalThis.setProps?.(props, { ...props, checked: isChecked })
  // #ENDIF

  return (
    <label className={css} style={style} data-disabled={disabled || undefined} ref={ref}>
      <Component size={iconSize} />
      {label && <span className="q-checkbox__label">{label}</span>}
      <input
        className="q-checkbox__input"
        type="checkbox"
        disabled={disabled}
        checked={isChecked || false}
        onChange={() => onChangeInput(!isChecked)}
      />
    </label>
  )
})
QCheckbox.displayName = 'QCheckbox'
type TQCheckboxProps = TBaseProps & {
  /**
   * @doc:attr
   */
  checked?: boolean

  /**
   * @doc:attr
   */
  checkedIcon?: any

  /**
   * @doc:attr
   * @doc:attr:control { "type":"select", "options": ["left", "right"] }
   */
  iconAlign?: 'left' | 'right'

  /**
   * @doc:attr
   */
  iconSize?: number

  /**
   * @doc:attr
   * @doc:attr:control { "value":"Checkbox label" }
   */
  label?: any

  /**
   * @doc:attr
   * @doc:attr:control false
   */
  name?: string

  /**
   * @doc:attr:type event
   */
  onChange?: (event: any) => void

  /**
   * @doc:attr
   * @doc:attr:control false
   */
  rules?: any

  /**
   * @doc:attr
   */
  skeleton?: boolean

  /**
   * @doc:attr
   */
  uncheckedHide?: boolean

  /**
   * @doc:attr
   */
  uncheckedIcon?: any

  /**
   * @doc:attr
   */
  undeterminedIcon?: any
}
