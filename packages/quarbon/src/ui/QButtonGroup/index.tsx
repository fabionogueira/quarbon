import { forwardRef, useEffect, useState } from 'react'
import { createClassName, TCssMap } from '@quarbon/utils/css'
import { TBaseProps } from '@quarbon/types/TBaseProps'
import './QButtonGroup.scss'

const cssMap: TCssMap = {
  disabled: { true: 'q-button-group--disabled' },
  // spread: { true: "q-button-group--spread" },
  // spacing(value) {
  //     return `q-button-group--spacing-${value}`;
  // },
  skeleton: { true: 'q-skeleton' },
}

/**
 * @doc:component
 */
export const QButtonGroup = forwardRef<HTMLDivElement, TQButtonGroupProps>((props, ref) => {
  const { style, active, onChange } = props
  const css = createClassName(cssMap, props, 'row q-button-group')
  const children = Array.isArray(props.children) ? props.children : props.children ? [props.children] : null
  const [activeIndex, setActiveIndex] = useState(active)
  const realIndex = active === undefined ? (activeIndex === undefined ? 0 : activeIndex) : active

  let finalActiveIndex = -1
  let lastEnabledIndex = -1
  let activeDisabled = -1

  // #IFDOC
  globalThis.setProps?.({ ...props, active: activeIndex })
  // #ENDIF

  useEffect(() => {
    if (!children) return
    if ((activeDisabled > -1 || finalActiveIndex == -1) && lastEnabledIndex > -1) {
      onButtonClick(lastEnabledIndex, children[lastEnabledIndex].key)
    }
  }, [children])

  function onButtonClick(index: number, key: string) {
    setActiveIndex(index)
    onChange?.(key, index)
  }

  if (children) {
    for (let index = 0; index < children.length; index++) {
      const child = children[index]
      const isActive = props.value ? child.key === props.value : realIndex == index

      if (!child.props.disabled && lastEnabledIndex == -1) {
        lastEnabledIndex = index
      }

      if (isActive && child.props.disabled) {
        activeDisabled = index
        break
      }

      if (isActive) {
        finalActiveIndex = index
        break
      }
    }
  }

  return (
    <div ref={ref} data-container="" className={css} style={style}>
      {children?.map((child, index) => {
        const isActive = finalActiveIndex == index

        return (
          <div
            className={isActive ? 'col q-button-group__active' : 'col'}
            key={index}
            onClick={() => {
              if (!child.props.disabled) onButtonClick(index, child.key)
            }}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
})
QButtonGroup.displayName = 'QButtonGroup'
type TQButtonGroupProps = TBaseProps & {
  /**
   * @doc:attr
   */
  active?: number

  /**
   * @doc:attr
   */
  value?: any
  // spread?: boolean;
  // spacing?: number;

  /**
   * @doc:attr:type event
   */
  onChange?: (key: string, index: number) => void

  /**
   * @doc:attr:name skeleton
   * @doc:attr:type boolean
   */
}
