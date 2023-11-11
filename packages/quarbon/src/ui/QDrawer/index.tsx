import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { createClassName } from '@quarbon/utils/css'
import { TBaseProps } from '@quarbon/types'
import { Screen } from '@quarbon/utils/screen'
import { QResizerListener } from '@quarbon/ui'
import './QDrawer.scss'

const cssMap: any = {
  slide: { left: 'q-drawer--left', right: 'q-drawer--right' },
  mini: { true: 'q-drawer--mini' },
}

let QDrawerId = 0

/**
 * @doc:component
 */
export const QDrawer = forwardRef<HTMLElement, TQDrawerProps>((props, ref) => {
  const [id] = useState(`QScreen-${++QDrawerId}`)
  const [width, setWidth] = useState(props.width ?? 250)
  const [breakpointMode, setBreakpointMode] = useState(false)
  const backdropElementRef = useRef<any>()
  const elRef = useRef(null)
  const defaults = {
    slide: 'left',
  }
  const {
    breakpoint = 0,
    children,
    mini = false,
    overlay = false,
    miniSize = 48,
    open = true,
    slide,
    style = {},
    onClose,
    onChange,
  } = props
  const overlayMode = overlay || breakpointMode
  const cls = createClassName(cssMap, props, `q-drawer${overlayMode ? ' q-drawer--overlay' : ''}`, defaults)
  const onResizeWindow = useCallback(
    (width: number) => {
      if (width <= breakpoint && open) {
        setBreakpointMode(true)
        onChange?.(false)
      } else if (width > breakpoint && !open) {
        setBreakpointMode(false)
        onChange?.(true)
      }
    },
    [breakpoint, onChange, open],
  )

  ref = ref ?? elRef

  if (open) {
    style[slide == 'right' ? 'marginRight' : 'marginLeft'] = 0
  } else {
    style[slide == 'right' ? 'marginRight' : 'marginLeft'] = -(mini ? miniSize : width)
  }

  useEffect(() => {
    if (breakpoint) {
      Screen.onResize(onResizeWindow, id)
      onResizeWindow(Screen.width())
    }

    return () => {
      Screen.offChange(id)
    }
  }, [id, breakpoint, open, onResizeWindow])

  useEffect(() => {
    onChange?.(open)
  }, [onChange, open])

  useLayoutEffect(() => {
    const el = (ref as any).current

    if (open) el['close-drawer'] = () => onClose?.()

    return () => {
      el && delete el['close-drawer']
    }
  }, [ref, open, onClose])

  function onClickBackdrop() {
    onChange ? onChange(!open) : onClose?.()
  }
  function onComponentResize(size: number) {
    setWidth(size)
  }

  return (
    <>
      <QResizerListener onResize={onComponentResize} nodeRef={ref} />
      <CSSTransition
        nodeRef={backdropElementRef}
        in={overlayMode && open && !mini}
        unmountOnExit
        classNames="fade"
        timeout={300}
      >
        <div ref={backdropElementRef} className="q-drawer__backdrop" onClick={onClickBackdrop} />
      </CSSTransition>

      <CSSTransition
        nodeRef={ref}
        in={open}
        // unmountOnExit
        classNames="none"
        timeout={300}
      >
        <aside
          ref={ref}
          data-close-drawer="true"
          className={cls}
          style={{
            ...style,
            width: mini ? miniSize : width,
          }}
        >
          {children}
        </aside>
      </CSSTransition>
    </>
  )
})
QDrawer.displayName = 'QDrawer'
type Slide = 'left' | 'right'
type TQDrawerProps = TBaseProps & {
  /**
   * @doc:attr
   */
  breakpoint?: number

  /**
   * @doc:attr
   */
  mini?: boolean

  /**
   * @doc:attr
   */
  miniSize?: number

  /**
   * @doc:description Puts drawer into overlay mode (does not occupy space on screen, narrowing the page)
   */
  overlay?: boolean

  /**
   * @doc:attr
   */
  open?: boolean

  /**
   * @doc:attr:type event
   */
  onOpen?: () => void

  /**
   * @doc:attr:type event
   */
  onClose?: () => void

  /**
   * @doc:attr:type event
   */
  onChange?: (open: boolean) => void

  /**
   * @doc:attr:type string
   * @doc:description "left" or "right" value
   * @doc:control { "type":"select", "options": ["left", "right"] }
   */
  slide?: Slide

  /**
   * @doc:attr
   */
  width?: number
}
