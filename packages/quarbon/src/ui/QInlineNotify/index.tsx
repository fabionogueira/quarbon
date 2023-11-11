import { forwardRef } from 'react'
import { SvgIcon } from '@quarbon/utils/svgicon'
import { Icon } from '@quarbon/ui/Icon'
import { createClassName } from '@quarbon/utils/css'
import { TBaseProps } from '@quarbon/types'
import './QInlineNotify.scss'

SvgIcon.set('q-inline-notify__close-icon', {
  content:
    '<path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />',
  viewBox: '0 0 24 24',
})
SvgIcon.set('q-inline-notify__error-icon', {
  content:
    '<path d="M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z"></path><path d="M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z" opacity="0"></path>',
  viewBox: '0 0 20 20',
})

const cssMap: any = {
  kind: {
    error: 'q-inline-notify--error',
    info: 'q-inline-notify--info',
    success: 'q-inline-notify--success',
    warning: 'q-inline-notify--warning',
  },
}

/**
 * @doc:component
 */
export const QInlineNotify = forwardRef<HTMLDivElement, TQInlineNotifyProps>((props, ref) => {
  const { children, style, title, subtitle, caption, onCloseClick } = props

  const css = createClassName(cssMap, props, 'q-inline-notify row')

  function onClick() {
    onCloseClick && onCloseClick()
  }

  return (
    <div className={css} style={style}>
      <div className="q-inline-notify__before">
        <Icon name="q-inline-notify__error-icon" size="20px" />
      </div>
      <div className="q-inline-notify__body">
        {title ? <h6 className="q-inline-notify__title">{title}</h6> : null}
        <div className="text-subtitle2 q-inline-notify__subtitle">{subtitle}</div>
        {caption ? <div className="text-caption q-inline-notify__caption">{caption}</div> : null}
        {children}
      </div>
      <div className="q-inline-notify__after">
        <div className="q-inline-notify__close-button row align-center justify-center q-clickable" onClick={onClick}>
          <Icon name="q-inline-notify__close-icon" size="20px" />
        </div>
      </div>
    </div>
  )
})
QInlineNotify.displayName = 'QInlineNotify'
type TQInlineNotifyKind = 'error' | 'info' | 'success' | 'warning'
type TQInlineNotifyProps = TBaseProps & {
  /**
   * @doc:attr:control { "value": "Title" }
   */
  title?: string

  /**
   * @doc:attr:control { "value": "Subtitle" }
   */
  subtitle?: string

  /**
   * @doc:attr:control { "value": "Caption" }
   */
  caption?: string

  /**
   * @doc:attr:type string
   * @doc:attr:control { "type":"select", "options":["error", "info", "success", "warning"], "value":"success" }
   */
  kind?: TQInlineNotifyKind

  /**
   * @doc:attr:control false
   */
  icon?: any

  /**
   * @doc:attr:type event
   */
  onCloseClick?: () => void
}
