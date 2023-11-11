import { forwardRef, useLayoutEffect, useState } from 'react'

import { createClassName, cssMapBase } from '@quarbon//utils/css'
import { TBaseProps, TColor } from '@quarbon/types'

import './QBadge.scss'

const cssMap: any = {
  color: cssMapBase.color,
  transparent: { true: 'q-badge--transparent' },
  outline: { true: 'q-badge--outline' },
  rounded: { true: 'q-badge--rounded' },
  floating: { true: 'q-badge--floating' },
  align: {
    left: 'q-badge--left',
    center: 'q-badge--center',
    right: 'q-badge--right',
  },
  verticalAlign: {
    top: 'q-badge--top',
    middle: 'q-badge--middle',
    bottom: 'q-badge--bottom',
  },
}
const defaults = {
  color: 'warning',
  rounded: true,
  floating: true,
  align: 'right',
  verticalAlign: 'top',
}

/**
 * @doc:component
 */
export const QBadge = forwardRef<HTMLDivElement, TQBadgeProps>((props, _) => {
  const { children, label, style, buzz = true } = props
  const css = createClassName(cssMap, props, 'q-badge', defaults)
  const [buzzCss, setBuzz] = useState('')

  useLayoutEffect(() => {
    setBuzz(buzz ? ' q-badge--buzz' : '')
    setTimeout(() => {
      setBuzz('')
    }, 400)
  }, [buzz])

  return (
    <div className={css + buzzCss} style={style}>
      {children ?? label}
    </div>
  )
})
QBadge.displayName = 'QBadge'

type TQBadgeProps = TBaseProps & {
  /**
   * @doc:attr:type string
   * @doc:attr:description Change badge background color
   * @doc:attr:default warning
   * @doc:attr:control: { "type":"select", "options": ["primary", "secondary", "warning", "positive", "negative", "info", "accent"] }
   */
  color?: TColor

  /**
   * @doc:attr
   * @doc:attr:default true
   */
  buzz?: boolean | number

  /**
   * @doc:attr
   * @doc:attr:control { "value":"5" }
   */
  label?: string | number

  /**
   * @doc:attr
   * @doc:attr:default true
   */
  floating?: boolean

  /**
   * @doc:attr
   */
  transparent?: boolean

  /**
   * @doc:attr
   */
  outline?: boolean

  /**
   * @doc:attr
   * @doc:attr:default true
   */
  rounded?: boolean

  /**
   * @doc:attr
   * @doc:attr:control { "type":"select", "options": ["left", "center", "right"] }
   */
  align?: 'left' | 'center' | 'right'

  /**
   * @doc:attr
   * @doc:attr:control { "type":"select", "options": ["top", "middle", "bottom"] }
   */
  verticalAlign?: 'top' | 'middle' | 'bottom'

  /**
   * @doc:attr:type event
   */
  onMounted?: () => void
}