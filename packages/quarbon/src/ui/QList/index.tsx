import { forwardRef } from 'react'
import { createClassName } from '@quarbon/utils/css'
import { DOM } from '@quarbon/utils/dom'
import { TBaseProps } from '@quarbon/types'
import { getPlugin } from '@quarbon/index'
import './QList.scss'

const cssMap: any = {
  bordered: { true: 'q-list--bordered' },
  separator: { true: 'q-list--separator' },
}
const defaults = {}

/**
 * @doc:component
 */
export const QList = forwardRef<HTMLDivElement, TQListProps>((props, ref) => {
  const { children, style } = props
  const css = createClassName(cssMap, props, 'q-list', defaults)

  return (
    <div className={css} style={style}>
      {children}
    </div>
  )
})
QList.displayName = 'QList'
type TQListProps = TBaseProps & {
  /**
   * @doc:attr
   */
  bordered?: boolean

  /**
   * @doc:attr
   */
  separator?: boolean

  /**
   * @doc:attr:type event
   */
  onClick?: () => void
}

const cssItemMap: any = {
  active: { true: 'q-list__item--active' },
  clickable: { true: 'q-clickable q-hover' },
  skeleton: { true: 'q-skeleton' },
  disabled: { true: 'q-disabled' },
}
const defaultsItem: any = {}

/**
 * @doc:component QListItem
 */
export const QListItem = forwardRef<HTMLDivElement, TQListItemProps>((props, ref) => {
  const { children, clickable, to, active, activeClass, style, onClick } = props
  const routePlugin = getPlugin('router')
  const location = active === undefined && to ? routePlugin.useLocation() : null
  const navigate = to ? routePlugin.useNavigate() : null
  const isActive = active === undefined && to ? location?.pathname == to : active
  const attrs = DOM.dataAttrs(props)
  let css = createClassName(cssItemMap, props, 'row q-list__item', defaultsItem)

  if (isActive) {
    css += ` q-list__item--active ${activeClass || ''}`
  }

  function onClickLocal(evt: any) {
    if (to && navigate) navigate(to)

    if (clickable) {
      if (evt.target.closest('.c-menu')) {
        DOM.dataActionDispatch('close-modal')
      }
      onClick && onClick(evt)
    }
  }

  return (
    <div {...attrs} ref={ref} className={css} style={style} tabIndex={-1} onClick={onClickLocal}>
      {children}
    </div>
  )
})
QListItem.displayName = 'QListItem'
/**
 * @extends TBaseProps
 */
type TQListItemProps = TBaseProps & {
  /**
   * @doc:attr
   */
  active?: boolean

  /**
   * @doc:attr
   */
  activeClass?: string

  /**
   * @doc:attr
   */
  clickable?: boolean

  /**
   * @doc:attr
   */
  dark?: boolean

  /**
   * @doc:attr
   */
  skeleton?: boolean

  /**
   * @doc:attr
   */
  to?: string

  /**
   * @doc:attr:type event
   */
  onClick?: (event: any) => void
}

const cssSectionMap: any = {
  avatar: { true: 'q-list__section--avatar' },
  side: { true: 'q-list__section--side' },
  skeleton: { true: 'q-skeleton' },
  thumbnail: { true: 'q-list__section--thumbnail' },
  top: { true: 'q-list__section--top' },
}
/**
 * @doc:component QListSection
 */
export const QListSection = forwardRef<HTMLDivElement, TQListSectionProps>((props, ref) => {
  const css = createClassName(cssSectionMap, props, 'q-list__section col')

  return (
    <div className={css} style={props.style}>
      {props.children}
    </div>
  )
})
QListSection.displayName = 'QListSection'
type TQListSectionProps = TBaseProps & {
  /**
   * @doc:attr
   */
  avatar?: boolean

  /**
   * @doc:attr
   */
  side?: boolean

  /**
   * @doc:attr
   */
  skeleton?: boolean

  /**
   * @doc:attr
   */
  thumbnail?: boolean

  /**
   * @doc:attr
   */
  top?: boolean
}

const cssLabelMap: any = {
  caption: { true: 'q-list__label--caption' },
  header: { true: 'q-list__label--header' },
  overline: { true: 'q-list__label--overline' },
  skeleton: { true: 'q-skeleton' },
}
/**
 * @doc:component
 */
export const QListLabel = forwardRef<HTMLDivElement, TQListLabelProps>((props, ref) => {
  const { lines, style } = props
  const css = createClassName(cssLabelMap, props, 'q-list__label')

  let stl: any = {}

  if (lines) {
    stl = {
      lineClamp: lines,
      WebkitLineClamp: lines,
      overflow: 'hidden',
      ...style,
    }
  }

  return (
    <div className={css} style={stl}>
      {props.children}
    </div>
  )
})
QListLabel.displayName = 'QListLabel'
type TQListLabelProps = TBaseProps & {
  /**
   * @doc:attr
   */
  caption?: boolean

  /**
   * @doc:attr
   */
  header?: boolean

  /**
   * @doc:attr
   */
  lines?: number | string

  /**
   * @doc:attr
   */
  overline?: boolean

  /**
   * @doc:attr
   */
  skeleton?: boolean
}
