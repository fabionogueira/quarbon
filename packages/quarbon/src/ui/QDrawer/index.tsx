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
const defaults = {
  slide: 'left',
}

let QDrawerId = 0

/**
 * @doc:component
 */
export const QDrawer = forwardRef<HTMLElement, TQDrawerProps>((props, ref) => {
  const backdropElementRef = useRef<any>()
  const elRef = useRef(null)
  const {
    children,
    breakpoint = 1023,
    breakpointAction = 'none',
    open = true,
    overlay = false,
    mini = false,
    miniSize = 48,
    width = 250,
    slide,
    style = {},
    onClose,
    onChange,
  } = props
  const [_open, setOpen] = useState(open)
  const [_mini, setMini] = useState(mini)
  const [_overlay, setOverlay] = useState(overlay)
  const [id] = useState(`QScreen-${++QDrawerId}`)
  const [_width, setWidth] = useState(width)
  const [lastAction, setLastAction] = useState("")
  const cls = createClassName(cssMap, props, `q-drawer${_overlay ? ' q-drawer--overlay' : ''}`, defaults)
  const onResizeWindow = useCallback(
    (w: number) => {
      if (w <= breakpoint) {
        if (breakpointAction == 'mini') {
          setMini(true)
        } else if (breakpointAction == 'overlay') {
          if (_open) {
            setOverlay(true)
          }
        } else if (breakpointAction == 'close') {
          setOpen(false)
        }
          setLastAction(breakpointAction)
      } else if (w > breakpoint) {
        if (lastAction == "mini") {
          setMini(false)
        } else if (lastAction == "overlay") {
          setOverlay(false)
        }
        if (lastAction == "close") {
          setOpen(true)
        }
        setLastAction("")
      }
    },
    [breakpoint, breakpointAction, _open, lastAction],
  )

  ref = ref ?? elRef

  if (!_open) {
    style[slide == 'right' ? 'marginRight' : 'marginLeft'] = -_width
  }

  useEffect(() => {
    setOpen(open)
    setMini(mini)
    setOverlay(overlay)
    setLastAction("")
  }, [mini, open, overlay])

  useEffect(() => {
    if (!_open) {
      setOverlay(false)
      onClose?.()
    }
    onChange?.(_open)
  }, [_open, onChange, onClose]);

  useEffect(() => {
    if (breakpointAction != 'none') {
      Screen.onResize(onResizeWindow, id)
      onResizeWindow(Screen.width())
    }

    return () => {
      Screen.offChange(id)
    }
  }, [breakpointAction, id, onResizeWindow])

  useLayoutEffect(() => {
    const el = (ref as any).current

    if (_open) el['close-drawer'] = () => onClose?.()

    return () => {
      el && delete el['close-drawer']
    }
  }, [ref, _open, onClose])

  function onClickBackdrop() {
    setOpen(false)
    setOverlay(false)
  }
  function onComponentResize(size: number) {
    setWidth(size)
  }

  return (
    <>
      <QResizerListener onResize={onComponentResize} nodeRef={ref} />

      {/* overlay element */}
      <CSSTransition nodeRef={backdropElementRef} in={_overlay} unmountOnExit classNames="fade" timeout={300}>
        <div ref={backdropElementRef} className="q-drawer__backdrop" onClick={onClickBackdrop} />
      </CSSTransition>

      {/* content element */}
      <CSSTransition
        nodeRef={ref}
        in={_open}
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
            width: _mini ? miniSize : _width,
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
type TBreakpointAction = 'overlay' | 'close' | 'mini' | 'none'
type TQDrawerProps = TBaseProps & {
  /**
   * @doc:attr:type string
   * @doc:attr:default none
   * @doc:attr:description "overlay" | "close" | "mini" | "none"
   * @doc:attr:control { "value":"none", "type":"select", "options":[ "overlay", "close", "mini", "none" ]}
   */
  breakpointAction?: TBreakpointAction

  /**
   * @doc:attr:default 1023
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
