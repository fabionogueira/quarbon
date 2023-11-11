import { forwardRef } from 'react'

import { createClassName, cssMapBase } from '@quarbon/utils/css'
import { TBaseProps, TColor } from '@quarbon/types'

import './QLoading.scss'

const cssMap: any = {
  color: cssMapBase.colorText,
  inline: { false: 'q-loading--no-inline' },
  overlay: { true: 'q-loading--overlay' },
  labelPosition: {
    left: 'q-loading--left',
    top: 'q-loading--top',
    bottom: 'q-loading--bottom',
  },
}
/**
 * @doc:component
 */
export const QLoading = forwardRef<HTMLDivElement, TQLoadingProps>((props, ref) => {
  const { style, size = 32, label } = props
  const css = createClassName(cssMap, props, 'q-loading row align-center justify-center')
  const width = Number(size || 32)
  const height = width

  return (
    <div ref={ref} className={css} style={style}>
      <div
        className="q-loading__icon"
        style={{
          width: width,
          height,
        }}
      >
        <svg className="q-loading__svg" viewBox="0 0 100 100">
          <title>Loading data...</title>
          {/*<circle className="q-loading__background" cx="50%" cy="50%" r="44"></circle>*/}
          <circle className="q-loading__stroke" cx="50%" cy="50%" r="44"></circle>
        </svg>
      </div>
      {label && <div className="q-loading__label">{label}</div>}
    </div>
  )
})
QLoading.displayName = 'QLoading'
type TQLoadingProps = TBaseProps & {
  /**
   * @doc:attr:control { "value":"loading" }
   */
  label?: string

  /**
   * @doc:attr:type string
   * @doc:attr:default right
   * @doc:attr:control { "type":"select", "options": ["top", "bottom", "left", "right"]}
   */
  labelPosition?: 'top' | 'bottom' | 'left' | 'right'

  /**
   * @doc:attr:control { "value":32 }
   */
  size?: number

  /**
   * @doc:attr:type string
   * @doc:attr:default secondary
   * @doc:attr:control { "type":"select", "options": ["primary","secondary","accent","positive","negative","info","warning"] }
   */
  color?: TColor

  /**
   * @doc:attr:default true
   */
  overlay?: boolean

  /**
   * @doc:attr:default true
   */
  inline?: boolean
}
