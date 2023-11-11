import { useContext, useEffect } from 'react'
import { createClassName } from '@quarbon/utils/css'
import { getPlugin } from '@quarbon/index'
import { TBaseProps } from '@quarbon/types'
import { QTabsContext } from './QTabsContext'
import './QTab.scss'

const cssMap: any = {
  disable: { true: 'q-tab--disable' },
  indicator: {
    top: 'q-tab__indicator--top',
    bottom: 'q-tab__indicator--bottom',
  },
}

/**
 * @doc:component
 */
export function QTab(props: TQTabProps) {
  const ctx = useContext(QTabsContext)
  const routePlugin = getPlugin('router')
  const location = routePlugin.useLocation?.()
  const navigate = routePlugin.useNavigate?.()
  const defaults = {
    align: 'center',
    indicator: ctx.indicator,
    color: ctx.color,
  }
  const { children, name, icon, label, to, onClick } = props
  const isActive = to ? location?.pathname == to : ctx.active == name
  const cssActive = isActive ? ` q-tab--active ${ctx.activeClass}` : ''
  const cls = createClassName(cssMap, props, `q-tab${cssActive}`, defaults)

  // force render when location.pathname is changed
  useEffect(() => undefined, [location?.pathname])

  function onClickLocal(evt: any) {
    to && navigate(to)
    ctx.setActive(name)
    onClick?.(evt)
  }

  return (
    <div data-container="true" className={cls} onClick={onClickLocal}>
      {icon && <i>{icon}</i>}
      {label}
      {children}
    </div>
  )
}
QTab.displayName = 'QTab'
type TQTabProps = TBaseProps & {
  /**
   * @doc:attr
   */
  name: string

  /**
   * @doc:attr:control false
   */
  icon?: any

  /**
   * @doc:attr
   */
  label?: string

  /**
   * @doc:attr:control false
   */
  to?: string

  /**
   * @doc:attr:type event
   */
  onClick?: (event: any) => void
}
