import { forwardRef, useEffect, useRef, useState } from 'react'
import { TBaseProps } from '@quarbon/types'
import { createClassName } from '@quarbon/utils/css'
import './QResizer.scss'

const cssMap: any = {
  inset: { true: 'q-resizer--inset' },
  orientation: {
    horizontal: 'q-resizer--horizontal',
    vertical: 'q-resizer--vertical',
  },
}

/**
 * @doc:component
 */
export const QResizer = forwardRef<HTMLDivElement, TQResizerProps>((props, ref) => {
  const css = createClassName(cssMap, props, 'q-resizer')
  const { onDrag, onDragEnd, orientation, max, min, target } = props
  const elRef = useRef(null)

  let targetElement: HTMLElement
  let targetWidth: number
  let targetHeight: number

  ref = ref ?? elRef

  function registerEvents() {
    const el = (ref as any).current

    el.ondragstart = onDragStartLocal
    el.ondragmove = onDragMove
    el.ondragend = onDragEndLocal
    el.setAttribute('drag-cursor', orientation == 'horizontal' ? 'row-resize' : 'col-resize')
  }

  function onDragStartLocal(event: any) {
    const target: any = event.target

    targetElement = target == 'after' ? target.nextSibling : target.previousSibling
    targetWidth = targetElement.offsetWidth
    targetHeight = targetElement.offsetHeight
  }

  function onDragMove(event: any) {
    let size: number, desloc

    event.cancel = true

    if (!targetElement) {
      return
    }

    if (orientation == 'horizontal') {
      desloc = target == 'after' ? -event.deslocY : event.deslocY
      size = sizeLimit(targetHeight + desloc)
      targetElement.style.height = `${size}px`
      targetElement.style.maxHeight = `${size}px`
      targetElement.style.minHeight = `${size}px`
    } else {
      desloc = target == 'after' ? -event.deslocX : event.deslocX
      size = sizeLimit(targetWidth + desloc)
      targetElement.style.width = `${size}px`
      targetElement.style.maxWidth = `${size}px`
      targetElement.style.minWidth = `${size}px`
    }

    Object.keys(QResizerListeners).forEach((key: any) => {
      const item = QResizerListeners[key]

      if (targetElement == item.nodeRef?.current) {
        dispatch(key, size, event)
      }
    })

    onDrag?.(size, event)
  }

  function onDragEndLocal(event: any) {
    const el = (ref as any).current

    delete el.ondragstart
    delete el.ondragmove
    delete el.ondragend

    onDragEnd?.(event)
  }

  function sizeLimit(value: number) {
    if (max && value > max) return max
    if (min && value < min) return min
    return value
  }

  return <div drag-enabled="true" ref={ref} style={props.style} className={css} onMouseDown={registerEvents} />
})
QResizer.displayName = 'QResizer'
type TQResizerProps = TBaseProps & {
  /**
   * @doc:attr:control { "type":"select", "options":["horizontal", "vertical"] }
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * @doc:attr:control false
   */
  target?: 'before' | 'after'

  /**
   * @doc:attr
   */
  min?: number

  /**
   * @doc:attr
   */
  max?: number

  /**
   * @doc:attr:type event
   */
  onDrag?: (size: number, event: any) => void

  /**
   * @doc:attr:type event
   */
  onDragEnd?: (event: any) => void
}

const QResizerListeners: Record<number, any> = {}
let QResizerListenerIndex = 0

type TQResizerListenerProps = {
  nodeRef: any
  onResize: (size: number, event: any) => void
}
export function QResizerListener({ onResize, nodeRef }: TQResizerListenerProps) {
  const [key] = useState(QResizerListenerIndex++)

  useEffect(() => {
    QResizerListeners[key] = {
      nodeRef,
      onResize,
    }

    return () => {
      delete QResizerListeners[key]
    }
  })

  return null
}

let dispatchTime: any

function dispatch(key: any, size: any, event: any) {
  debounce(() => {
    const item = QResizerListeners[key]

    if (item) {
      item.onResize(size, event)
    }

    window.dispatchEvent(new Event('debounce-resize'))
  })
}

function debounce(fn: () => void) {
  clearTimeout(dispatchTime)
  dispatchTime = setTimeout(() => {
    fn()
  }, 100)
}

window.addEventListener('resize', () => {
  debounce(() => window.dispatchEvent(new Event('debounce-resize')))
})
