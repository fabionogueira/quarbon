import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { createClassName } from '@quarbon/utils/css'
import { SvgIcon } from '@quarbon/utils/svgicon'
import { CbCheckmark } from '@quarbon/icons/cb'
import { Icon } from '@quarbon/ui/Icon'
import { QCheckbox, QField, QList, QListItem, QListSection, QMenu, QSeparator } from '@quarbon/ui'
import { TBaseProps } from '@quarbon/types'
import './QSelect.scss'

SvgIcon.set('q-select-arrow', {
  content: '<path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>',
  viewBox: '0 0 16 16',
})

const cssMap: any = {
  bordered: { true: ' q-select-bordered' },
  flat: { true: ' q-select--flat' },
  inline: { true: 'q-select--inline' },
  skeleton: { true: 'q-skeleton' },
}
const defaults = {}

/**
 * @doc:component
 */
export const QSelect = forwardRef<HTMLLabelElement, TQSelectProps>((props, ref) => {
  const {
    children,
    style,
    optionLabel = 'label',
    optionValue = 'id',
    value,
    values,
    multiselect,
    displayValue,
    // name,
    // rules,
    emitChangeOnClose = false,
    error,
    options,
    onChange,
    ...rest
  } = props
  const elRef = useRef(null)
  const css = createClassName(cssMap, rest, 'q-select', defaults)
  const [iValue, setIValue] = useState(value || options?.[0]?.[optionValue as any])
  const [iValues, setIValues] = useState(
    values?.reduce((o, v) => {
      o[v] = true
      return o
    }, {}) ?? {},
  ) // {"v1":true}; [{id:"v1"}];
  const count = Object.keys(iValues).length
  const selected = options?.find((option) => option[optionValue] == iValue) ?? {}
  const onClickItem = useCallback(
    (option: TOption) => {
      const v = option[optionValue]

      if (multiselect) {
        if (iValues[option[optionValue]]) delete iValues[option[optionValue]]
        else iValues[option[optionValue]] = true
        setIValues({ ...iValues })
        !emitChangeOnClose && onChange?.(Object.keys(iValues))
      } else {
        setIValue(v)
        !emitChangeOnClose && onChange?.(option)
      }
    },
    [emitChangeOnClose, iValues, multiselect, onChange, optionValue],
  )
  const slotOption = useCallback(
    (option: TOption, index: number) => {
      if (option.separator) return <QSeparator key={index} />

      return (
        <QListItem
          clickable
          data-close-modal
          key={index}
          disabled={option.disabled === true}
          onClick={() => onClickItem(option)}
        >
          {props.slotOption?.(option, index) ?? (
            <>
              <QListSection style={{ paddingRight: 24 }}>{option[optionLabel]}</QListSection>
              <QListSection side>{option.checked && <CbCheckmark style={{ position: 'absolute' }} />}</QListSection>
            </>
          )}
        </QListItem>
      )
    },
    [onClickItem, optionLabel, props],
  )
  const slotOptionMultiselect = useCallback(
    (option: TOption, index: number) => {
      if (option.separator) return <QSeparator key={index} />

      return (
        <QListItem disabled={option.disabled === true} clickable key={index} onClick={() => onClickItem(option)}>
          {props.slotOption?.(option, index) ?? (
            <>
              <QListSection style={{ paddingRight: 24 }}>
                <QCheckbox checked={iValues[option[optionValue]] ?? false} label={option[optionLabel]} />
              </QListSection>
            </>
          )}
        </QListItem>
      )
    },
    [iValues, onClickItem, optionLabel, optionValue, props],
  )

  ref = ref ?? elRef

  useEffect(() => {
    setIValue(value)
  }, [value])

  function onCloseList() {
    if (!emitChangeOnClose) return

    if (multiselect) {
      emitChangeOnClose && onChange?.(Object.keys(iValues))
    } else {
      emitChangeOnClose && onChange?.(value)
    }
  }

  return (
    <QField ref={ref} style={style} error={error} {...rest} className={css}>
      <div className="q-clickable q-select__inner">
        <div className="q-select__content">
          {multiselect ? (
            <>
              {count > 0 && (
                <div className="q-select__count">
                  {count}{' '}
                  <svg
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    width="16"
                    height="16"
                    viewBox="0 0 32 32"
                  >
                    <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path>
                  </svg>
                </div>
              )}{' '}
              {displayValue}
            </>
          ) : (
            <>
              {displayValue ? <div className="q-select__caption">{displayValue}:</div> : null}
              <div>{selected[optionLabel]}</div>
            </>
          )}
        </div>
        <Icon name="q-select-arrow" size="16px" className="q-select__arrow" />
        <QMenu onClose={onCloseList}>
          <QList className="q-select__menu">
            {options
              ? options.map((option, index) =>
                  multiselect ? slotOptionMultiselect(option, index) : slotOption(option, index),
                )
              : children}
          </QList>
        </QMenu>
      </div>
    </QField>
  )
})
QSelect.displayName = 'QSelect'
type TOption = Record<string, any> & {
  disabled?: boolean
  separator?: boolean
  checked?: boolean
}
type TQSelectProps = TBaseProps & {
  /**
   * @doc:attr
   */
  bordered?: boolean

  /**
   * @doc:attr
   */
  error?: string

  /**
   * @doc:attr
   */
  label?: string

  /**
   * @doc:attr:control false
   */
  name?: string

  /**
   * @doc:attr
   */
  flat?: boolean

  /**
   * @doc:attr
   */
  inline?: boolean

  /**
   * @doc:attr:type string
   */
  displayValue?: any

  /**
   * @doc:attr
   */
  multiselect?: boolean

  /**
   * @doc:attr:type any[]
   * @doc:attr:control false
   */
  options?: Array<TOption>

  /**
   * @doc:attr:control false
   */
  optionValue?: string

  /**
   * @doc:attr:control false
   */
  optionLabel?: string

  /**
   * @doc:attr:type event
   */
  onChange?: (item: any) => void

  /**
   * @doc:attr:control false
   */
  emitChangeOnClose?: boolean

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
  value?: any

  /**
   * @doc:attr:control false
   */
  values?: any[]

  /**
   * @doc:attr:type callback
   * @doc:attr:control false
   */
  slotOption?: (option: TOption, index?: number) => any
}

/**
 * @doc:component
 */
export const QSelectItem = forwardRef<HTMLOptionElement, TQSelectItemProps>((props, _) => {
  const { children, value, label } = props

  return <option value={value}>{label ?? children}</option>
})
QSelectItem.displayName = 'QSelectItem'
type TQSelectItemProps = TBaseProps & {
  /**
   * @doc:attr
   */
  value: string | number

  /**
   * @doc:attr
   */
  label?: string
}
