import { forwardRef, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SvgIcon } from '@quarbon/utils/svgicon'
import { Icon } from '@quarbon/ui/Icon'
import { QField } from '@quarbon/ui'
import { createClassName } from '@quarbon/utils/css'
import { TBaseProps } from '@quarbon/types'
import { QFormContext } from '@quarbon/ui/QForm/QFormContext'

import './QTextbox.scss'

SvgIcon.set('q-textbox-view-password', {
  content:
    '<svg fill="currentColor"><path d="M15.5,7.8C14.3,4.7,11.3,2.6,8,2.5C4.7,2.6,1.7,4.7,0.5,7.8c0,0.1,0,0.2,0,0.3c1.2,3.1,4.1,5.2,7.5,5.3	c3.3-0.1,6.3-2.2,7.5-5.3C15.5,8.1,15.5,7.9,15.5,7.8z M8,12.5c-2.7,0-5.4-2-6.5-4.5c1-2.5,3.8-4.5,6.5-4.5s5.4,2,6.5,4.5	C13.4,10.5,10.6,12.5,8,12.5z"></path><path d="M8,5C6.3,5,5,6.3,5,8s1.3,3,3,3s3-1.3,3-3S9.7,5,8,5z M8,10c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S9.1,10,8,10z"></path></svg>',
  viewBox: '0 0 16 16',
})
SvgIcon.set('q-textbox-view-password-active', {
  content:
    '<svg fill="currentColor"><path d="M2.6,11.3l0.7-0.7C2.6,9.8,1.9,9,1.5,8c1-2.5,3.8-4.5,6.5-4.5c0.7,0,1.4,0.1,2,0.4l0.8-0.8C9.9,2.7,9,2.5,8,2.5	C4.7,2.6,1.7,4.7,0.5,7.8c0,0.1,0,0.2,0,0.3C1,9.3,1.7,10.4,2.6,11.3z"></path><path d="M6 7.9c.1-1 .9-1.8 1.8-1.8l.9-.9C7.2 4.7 5.5 5.6 5.1 7.2 5 7.7 5 8.3 5.1 8.8L6 7.9zM15.5 7.8c-.6-1.5-1.6-2.8-2.9-3.7L15 1.7 14.3 1 1 14.3 1.7 15l2.6-2.6c1.1.7 2.4 1 3.7 1.1 3.3-.1 6.3-2.2 7.5-5.3C15.5 8.1 15.5 7.9 15.5 7.8zM10 8c0 1.1-.9 2-2 2-.3 0-.7-.1-1-.3L9.7 7C9.9 7.3 10 7.6 10 8zM8 12.5c-1 0-2.1-.3-3-.8l1.3-1.3c1.4.9 3.2.6 4.2-.8.7-1 .7-2.4 0-3.4l1.4-1.4c1.1.8 2 1.9 2.6 3.2C13.4 10.5 10.6 12.5 8 12.5z"></path></svg>',
  viewBox: '0 0 16 16',
})

const cssMap = {
  prefix(value: any) {
    return value ? 'q-textbox--prefixed' : ''
  },
  type(value: string) {
    if (value == 'textarea') return 'q-textbox--type-textarea'
  },
  disabled: { true: 'q-disabled' },
}
const defaults = {}

/**
 * @doc:component
 */
export const QTextbox = forwardRef<HTMLLabelElement, TQTextboxProps>((props, ref) => {
  let { append, error } = props
  const {
    // autogrow,
    // mask,
    className, // remove from ..rest
    autoFocus,
    disabled,
    maxLength,
    name,
    prefix,
    placeholder,
    readonly,
    rules,
    suffix,
    type = 'text',
    value,
    helperText,
    style,
    onChange,
    onBlur,
    onFocus,
    ...rest
  } = props
  const css = createClassName(cssMap, props, 'q-textbox', defaults)
  const [valueS, setValue] = useState(value)
  const [focus, setFocus] = useState(false)
  const [showPsw, setShowPsw] = useState(false)
  const ctx = useContext(QFormContext)
  const inputRefElement = useRef<any>(null)

  if (type == 'password') {
    append = Array.isArray(append) ? append : [append]
    append.push(
      <div key="q-textbox-append-button" className="q-textbox__view-password-button" onClick={onClick_ShowPassword}>
        <Icon name={showPsw ? 'q-textbox-view-password-active' : 'q-textbox-view-password'} size="16px" />
      </div>,
    )
  }

  if (ctx) {
    ctx.onSubmitError(name, () => {
      inputRefElement.current.focus()
    })

    error = error || ctx.getError(name)
  }

  useEffect(() => {
    setValue(value)
  }, [value])
  useLayoutEffect(() => {
    if (autoFocus) {
      inputRefElement.current?.focus()
    }
  }, [autoFocus])

  function onClick_ShowPassword() {
    setShowPsw(!showPsw)
  }

  function onInput(event: any) {
    const val = event.target.value

    setValue(val)
    onChange && onChange(val)
    name && ctx?.setValue(name, val, rules)
  }

  function onFocusLocal(flag: boolean) {
    if (flag && onFocus) onFocus()

    if (!flag && onBlur) onBlur()

    setFocus(flag)
  }

  return (
    <QField
      ref={ref}
      append={append}
      className={css}
      error={error}
      helperText={helperText}
      focus={focus}
      style={style}
      {...rest}
    >
      {prefix}
      {type == 'textarea' ? (
        <textarea
          readOnly={readonly}
          ref={inputRefElement}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          value={valueS || ''}
          onInput={onInput}
          onFocus={() => onFocusLocal(true)}
          onBlur={() => onFocusLocal(false)}
        />
      ) : (
        <input
          autoComplete="off"
          readOnly={readonly}
          disabled={disabled}
          ref={inputRefElement}
          name={name}
          maxLength={maxLength}
          type={showPsw ? 'text' : type}
          placeholder={placeholder}
          value={valueS || ''}
          onInput={onInput}
          onFocus={() => onFocusLocal(true)}
          onBlur={() => onFocusLocal(false)}
        />
      )}
      {suffix}
    </QField>
  )
})
QTextbox.displayName = 'QTextbox'
type TQTextboxProps = TBaseProps & {
  /**
   * @doc:attr
   */
  autogrow?: boolean

  /**
   * @doc:attr:control false
   */
  autoFocus?: boolean

  /**
   * @doc:attr:control false
   */
  defaultValue?: string | number

  /**
   * @doc:attr:control false
   */
  mask?: string

  /**
   * @doc:attr
   */
  maxLength?: number

  /**
   * @doc:attr:control false
   */
  name: string

  /**
   * @doc:attr
   */
  prefix?: string

  /**
   * @doc:attr
   */
  placeholder?: string

  /**
   * @doc:attr
   */
  readonly?: boolean

  /**
   * @doc:attr:control false
   */
  rules?: any

  /**
   * @doc:attr
   */
  suffix?: string

  /**
   * @doc:attr:control false
   */
  type?: TTypes

  /**
   * @doc:attr:control { "value":"" }
   */
  value?: string | number | null

  /**
   * @doc:attr
   */
  helperText?: string

  /**
   * @doc:attr
   */
  error?: string

  /**
   * @doc:attr:type event
   */
  onChange?: (value: string) => void

  /**
   * @doc:attr:type event
   */
  onBlur?: () => void

  /**
   * @doc:attr:type event
   */
  onFocus?: () => void

  /**
   * @doc:attr:control false
   * @doc:attr:description após o input
   */
  after?: any

  /**
   * @doc:attr:control false
   * @doc:attr:description no fim do input
   */
  append?: any

  /**
   * @doc:attr:control false
   * @doc:attr:description antes do input
   */
  before?: any

  /**
   * @doc:attr
   */
  clearable?: boolean

  /**
   * @doc:attr:control false
   */
  color?: string

  /**
   * @doc:attr
   */
  dark?: boolean

  /**
   * @doc:attr
   */
  filled?: boolean

  /**
   * @doc:attr
   */
  label?: string

  /**
   * @doc:attr
   */
  loading?: boolean

  /**
   * @doc:attr
   */
  outlined?: boolean

  /**
   * @doc:attr
   */
  standout?: boolean

  /**
   * @doc:attr:control false
   * @doc:attr:description no começo do input
   */
  prepend?: any
}
type TTypes =
  | 'text'
  | 'password'
  | 'textarea'
  | 'email'
  | 'search'
  | 'tel'
  | 'file'
  | 'number'
  | 'url'
  | 'time'
  | 'date'
