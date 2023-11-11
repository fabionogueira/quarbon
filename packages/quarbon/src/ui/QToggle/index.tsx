import { forwardRef, useContext, useEffect, useState } from 'react'
import { TBaseProps } from '@quarbon/types'
import { createClassName } from '@quarbon/utils/css'
import { QFormContext } from '@quarbon/ui/QForm/QFormContext'
import './QToggle.scss'

const QToggleCssMap = {
  checked: { true: 'q-toggle--checked' },
  disabled: { true: 'q-disabled q-toggle--disabled' },
  skeleton: { true: 'q-skeleton' },
}

/**
 * @doc:component
 */
export const QToggle = forwardRef<HTMLLabelElement, TQToggleProps>((props, ref) => {
  const { name, checked = false, disabled, style, onChange } = props

  const [isChecked, setIsChecked] = useState(checked)
  const ctx = useContext(QFormContext)
  let css = createClassName(QToggleCssMap, props, 'q-toggle q-clickable')

  if (isChecked) {
    css += 'q-toggle--checked'
  }

  function onChangeInput(val: boolean) {
    setIsChecked(val)
    onChange?.(val)
    name && ctx?.setValue(name, val)
  }

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  // #IFDOC
  globalThis.setProps?.(props, { ...props, checked: isChecked })
  // #ENDIF

  return (
    <label className={css} style={style} data-disabled={disabled ?? undefined} ref={ref}>
      <div className="q-toggle__inner">
        <div className="q-toggle__thumb" />
      </div>
      <input
        className="q-checkbox__input"
        type="checkbox"
        disabled={disabled}
        checked={isChecked || false}
        onChange={() => {
          onChangeInput(!isChecked)
        }}
      />
    </label>
  )
})
QToggle.displayName = 'QToggle'
type TQToggleProps = TBaseProps & {
  /**
   * @doc:attr
   */
  checked?: boolean

  /**
   * @doc:attr:type event
   */
  onChange?: (val: boolean) => void

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
