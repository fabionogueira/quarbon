import { forwardRef, useRef } from 'react'
import { DOM } from '@quarbon/utils/dom'
import { createClassName, cssMapBase, TCssMap } from '@quarbon/utils/css'
import { TColor, TBaseProps } from '@quarbon/types'
import { QLoading } from '@quarbon/ui'
import { getPlugin } from '@quarbon/index'
import './QButton.scss'

const cssMap: TCssMap = {
  flat: { true: 'q-button--flat' },
  iconAlign: { right: 'q-button--icon-right' },
  disabled: { true: 'q-button--disabled' },
  outline: { true: 'q-button--outline' },
  onlyIcon: { true: 'q-button--only-icon' },
  stretch: { true: 'self-stretch' },
  skeleton: { true: 'q-skeleton' },
  loading: { true: 'q-button--loading' },
  progress: { true: 'q-button--loading' },
  color(value: string, props: any) {
    if (props.flat || props.outline) return ''
    return cssMapBase.color[value]
  },
}

/**
 * @doc:component
 */
export const QButton = forwardRef<HTMLDivElement, TQButtonProps>((props, ref) => {
  const { children, label, style, icon, to, tooltip, type = 'button', disabled = false, loading, onClick } = props
  const altRef = useRef(null)
  const defaults = {
    iconAlign: 'left',
    onlyIcon: !props.label && !!props.icon,
    color: 'primary',
  }
  const elRef: any = ref ?? altRef
  const attrs = DOM.dataAttrs(props)
  const routePlugin = getPlugin('router')
  const navigate = to ? routePlugin.useNavigate?.() : null
  const css = createClassName(cssMap, props, 'q-button q-clickable q-hover', defaults)
  let { progress = 0 } = props

  if (progress > 100) {
    progress = 100
  }

  function onClickLocal(evt: any) {
    if (loading ?? progress) return

    if (navigate) {
      to && navigate(to)
    }

    if (onClick) onClick(evt)
  }

  function renderContent() {
    if (loading) {
      return <QLoading inline />
    }

    if (children && !defaults.onlyIcon) {
      return <div className="q-button__content">{children}</div>
    }

    return (
      <div className="q-button__content">
        {icon && <i className="q-button--icon">{icon}</i>}
        <span>{label}</span>
        {children}
      </div>
    )
  }

  // #IFDOC
  // globalThis.setProps?.(props)
  // #ENDIF

  return (
    <button
      disabled={disabled}
      data-progress={!!progress}
      {...attrs}
      ref={elRef}
      className={css}
      style={style}
      onClick={onClickLocal}
      title={tooltip}
      type={type as any}
    >
      {renderContent()}
      {progress > 0 && (
        <div className="q-button__progress">
          <div className="q-button__progress-inner" style={{ width: `${progress}%` }} />
        </div>
      )}
    </button>
  )
})
QButton.displayName = 'QButton'

export type TQButtonProps = TBaseProps & {
  /**
   * @doc:attr:description Change button background color
   * @doc:attr:default primary
   * @doc:attr:control {"type":"select", "options":["primary","secondary","warning","positive","negative","info","accent"]}
   */
  color?: TColor

  /**
   * @doc:attr
   */
  flat?: boolean

  /**
   * @doc:attr:description Native `<a>` link href attribute; Has priority over the `to` and `replace` props
   * @doc:attr:control false
   */
  href?: string

  /**
   * @doc:attr:control false
   */
  icon?: any

  /**
   * @doc:attr:type string
   * @doc:attr:control false
   */
  iconAlign?: 'left' | 'right'

  /**
   * @doc:attr:description The text that will be shown on the button
   * @doc:attr:control {"value": "Button"}
   */
  label?: string

  /**
   * @doc:attr
   */
  loading?: boolean

  /**
   * @doc:attr
   */
  outline?: boolean

  /**
   * @doc:attr:type event
   */
  onClick?: (event: any) => void

  /**
   * @doc:attr:default 0
   */
  progress?: number

  /**
   * @doc:attr
   */
  stretch?: boolean

  /**
   * @doc:attr
   */
  skeleton?: boolean

  /**
   * @doc:attr:description Native `<a>` link target attribute; Use it only with `to` or `href` props
   * @doc:attr:control false
   */
  target?: string // Native <a> link target attribute; Use it only with 'to' or 'href' props

  /**
   * @doc:attr:control false
   */
  to?: string

  /**
   * @doc:attr:type string
   * @doc:attr:control false
   */
  type?: 'a' | 'submit' | 'button' | 'reset'

  /**
   * @doc:attr:name tooltip
   * @doc:attr:type string
   * @doc:attr:control {"value": "Button tooltip"}
   */

  /**
   * @doc:attr:name disabled
   * @doc:attr:type boolean
   */
}
