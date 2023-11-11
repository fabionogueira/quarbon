import { forwardRef } from 'react'
import { createClassName } from '@quarbon/utils/css'
import { TBaseProps } from '@quarbon/types'
import './QToolbar.scss'

const cssMap: any = {
  dark: { true: 'q-dark-100' },
  inset: { true: 'q-toolbar--inset' },
}

/**
 * @doc:component
 */
export const QToolbar = forwardRef<HTMLDivElement, TQToolbarProps>((props, ref) => {
  const { style, children } = props
  const css = createClassName(cssMap, props, 'hbox v-align--center q-toolbar')

  return (
    <header ref={ref} style={style} data-container="" className={css}>
      {children}
    </header>
  )
})
QToolbar.displayName = 'QToolbar'
type TQToolbarProps = TBaseProps & {
  /**
   * @doc:attr:control false
   */
  color?: string

  /**
   * @doc:attr:control { "value":true }
   */
  dark?: boolean

  /**
   * @doc:attr
   */
  inset?: boolean
}

/**
 * @doc:component
 */
export const QToolbarTitle = forwardRef<HTMLDivElement, TQToolbarTitleProps>((props, ref) => {
  const { style, children } = props
  const css = createClassName(cssMap, props, 'row v-align--center q-toolbar__title')

  return (
    <div ref={ref} style={style} className={css}>
      {children}
    </div>
  )
})
QToolbarTitle.displayName = 'QToolbarTitle'
type TQToolbarTitleProps = TBaseProps
