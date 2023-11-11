import { forwardRef, useEffect, useState } from 'react'
import { createClassName } from '@quarbon/utils/css'
import { TBaseProps } from '@quarbon/types'

import './QProgress.scss'

const cssMap: any = {
  dark: { true: 'q-progress--dark' },
  indeterminate: { true: 'q-progress--indeterminate' },
  reverse: { true: 'q-progress--reverse' },
  rounded: { true: 'q-progress--rounded' },
  size: {
    xs: 'q-progress--xs',
    sm: 'q-progress--sm',
    md: 'q-progress--md',
    lg: 'q-progress--lg',
    xl: 'q-progress--xl',
  },
}
const defaults = {
  size: 'md',
}

/**
 * @doc:component
 */
export const QProgress = forwardRef<HTMLDivElement, TQProgressProps>((props, ref) => {
  const {
    animationSpeed = 1,
    hint,
    indeterminate,
    labelInner,
    max = 100,
    showProgress = false,
    style,
    value = 0,
    onChange,
    onChangeComplete,
  } = props
  const cls = createClassName(cssMap, props, 'q-progress', defaults)
  const height = 'xs sm md lg xl'.includes(String(props.size)) ? '' : props.size
  const [progress] = useState(new Progress(value))
  const [width, setWidth] = useState(props.indeterminate ? 100 : getWidth(value))
  const animationDuration = 1499 - 99 * (animationSpeed < 1 ? 1 : animationSpeed > 10 ? 10 : animationSpeed)
  const label = (showProgress ? `${Math.trunc(width)}% ` : '') + (props.label || '')

  useEffect(() => {
    progress.to(value, (newValue) => {
      const p = getWidth(newValue)

      setWidth(p)
      onChange && onChange(p, newValue)
    })

    return () => {
      progress.cancel()
    }
  }, [value])

  function getWidth(v: number) {
    let w = (v * 100) / max

    if (w > 100) w = 100
    else if (w < 0) w = 0

    return w
  }

  function onTransitionEnd() {
    onChangeComplete && onChangeComplete(width)
  }

  return (
    <div className={cls} style={style} ref={ref}>
      {label && <div className="q-progress__label">{label}</div>}

      <div className="q-progress__track" style={{ height }}>
        <div
          className="q-progress__value"
          style={{
            animationDuration: `${animationDuration}ms`,
            width: `${indeterminate ? 100 : width}%`,
          }}
          onTransitionEnd={onTransitionEnd}
        />
        {labelInner && <div className="q-progress__label-inner">{labelInner}</div>}
      </div>

      {hint && <div className="q-progress__hint">{hint}</div>}
    </div>
  )
})
QProgress.displayName = 'QProgress'
type TCallback = (progress: number) => void
type TSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type TQProgressProps = TBaseProps & {
  /**
   * @doc:attr
   */
  animationSpeed?: number

  /**
   * @doc:attr
   */
  dark?: boolean

  /**
   * @doc:attr:control { "value":"solving something" }
   */
  hint?: string

  /**
   * @doc:attr
   */
  indeterminate?: boolean

  /**
   * @doc:attr:type string
   * @doc:attr:control { "value":"completed" }
   */
  label?: string | number

  /**
   * @doc:attr
   */
  labelInner?: string

  /**
   * @doc:attr
   */
  min?: number

  /**
   * @doc:attr
   */
  max?: number

  /**
   * @doc:attr
   */
  reverse?: boolean

  /**
   * @doc:attr
   */
  rounded?: boolean

  /**
   * @doc:attr:control { "type":"select", "options":["xs", "sm", "md", "lg", "xl"] }
   */
  size?: TSize | string

  /**
   * @doc:attr:control { "value":50 }
   */
  value?: number

  /**
   * @doc:attr:control { "value":true }
   */
  showProgress?: boolean

  /**
   * @doc:attr:type event
   */
  onChange?: (percent: number, value: number) => void

  /**
   * @doc:attr:type event
   */
  onChangeComplete?: (percent: number) => void
}

export class Progress {
  private readonly _timeout: number
  private _value: number
  private _target = 0
  private _time: any

  constructor(value: number, timeout = 100) {
    this._value = value
    this._timeout = timeout
  }

  to(to: number, callback: TCallback) {
    const inc = this._value > to ? -1 : 1

    this._target = Number(to)

    clearTimeout(this._time)

    if (this._value != this._target) {
      this._value += inc
      this._time = setTimeout(() => {
        callback(this._value)
        this.to(this._target, callback)
      }, this._timeout)
    }
  }

  cancel() {
    clearTimeout(this._time)
    this._value = this._target
  }
}
