import { forwardRef, useEffect, useRef, useState } from 'react'
import { createClassName } from '@quarbon/utils/css'
import { TBaseProps } from '@quarbon/types'
import { QField } from '@quarbon/ui'

import './QSlider.scss'

const cssMap: any = {
  skeleton: { true: 'q-skeleton' },
}
const defaults = {}

/**
 * @doc:component
 */
export const QSlider = forwardRef<HTMLLabelElement, TQSliderProps>((props, ref) => {
  const { min = 0, max = 100, style, value = 0, onChange, onChanged, ...rest } = props
  const cls = createClassName(cssMap, props, 'q-slider', defaults)
  const [valueState, setValueState] = useState(value)
  const thumbRef = useRef(null)
  const trackRef = useRef(null)

  let width: number

  useEffect(() => {
    setValueState(value)
  }, [value])

  function registerEvents() {
    const el: any = thumbRef.current

    el.ondragstart = onDragStartLocal
    el.ondragmove = onDragMove
    el.ondragend = onDragEndLocal
  }

  function onDragStartLocal() {
    const tracker: any = trackRef.current
    width = tracker.offsetWidth
  }

  function onDragMove(event: { x: number; cancel: boolean }) {
    const x = event.x + 7 // margin-left: -7px
    const perc = (x * 100) / width
    let newValue = Math.round(((max - min) * perc) / 100 + min)

    if (newValue < min) newValue = min
    if (newValue > max) newValue = max

    event.cancel = true
    setValueState(newValue)
    onChange?.(newValue)
  }

  function onDragEndLocal() {
    const el: any = thumbRef.current

    delete el.ondragstart
    delete el.ondragmove
    delete el.ondragend

    onChanged?.(value)
  }

  function percent(v: number) {
    let p = ((v - min) * 100) / (max - min)

    if (p > 100) p = 100
    else if (p < 0) p = 0

    return `${p}%`
  }

  // #IFDOC
  // globalThis.setProps?.(props, {...props, value:valueState});
  // #ENDIF

  return (
    <QField {...rest} after={max} before={min} borderless className={cls} style={style} ref={ref}>
      <div className="q-slider__track-container">
        <div ref={trackRef} className="q-slider__track">
          <div className="q-slider__middle" />
          <div
            ref={thumbRef}
            drag-enabled="true"
            className="q-slider__thumb"
            style={{ left: percent(valueState) }}
            onMouseDown={registerEvents}
          />
        </div>
      </div>
    </QField>
  )
})
QSlider.displayName = 'QSlider'
type TQSliderProps = TBaseProps & {
  /**
   * @doc:attr:control false
   */
  after?: any

  /**
   * @doc:attr:control false
   */
  before?: any

  /**
   * @doc:attr:type string
   * @doc:attr:control { "value":"Slider" }
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
  skeleton?: boolean

  /**
   * @doc:attr:control { "value":50 }
   */
  value?: number

  /**
   * @doc:attr:type event
   */
  onChange?: (value: number) => void

  /**
   * @doc:attr:type event
   */
  onChanged?: (value: number) => void
}
