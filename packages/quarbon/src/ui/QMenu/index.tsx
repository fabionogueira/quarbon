import { useEffect, useState } from 'react'
import { TBaseProps } from '@quarbon/types'
import { UIModal, TAnchor } from '@quarbon/plugins/Modal'
import './QMenu.scss'

// lr-bt
// l = left    ( ref )
// r = right   ( target )
// b = bottom  ( ref )
// t = top     ( target  )

/**
 * @doc:component
 */
export const QMenu = (props: TQMenuProps) => {
  const {
    anchor,
    className = '',
    children,
    contextPosition = false,
    self,
    show = false,
    transition,
    touchPosition = false,
    fitToHeight = false,
    offsetLeft = 0,
    offsetRight = 0,
    offsetTop = 0,
    offsetBottom = 0,
    onClose,
    // onOpen,
    persistent = false,
  } = props

  const [showX, setShow] = useState(show)
  const [anchorEl, setAnchorEl] = useState()
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const anchorRef =
    props.anchorRef && typeof props.anchorRef === 'string'
      ? (document.querySelector(props.anchorRef) as HTMLElement)
      : props.anchorRef
  const transitionShow = transition || 'fade'
  const transitionHide = transition || 'fade'

  useEffect(() => {
    setShow(show)
  }, [show])

  function onCloseLocal() {
    onClose && onClose()
  }

  function onExternalAction(event: any) {
    switch (event.name) {
      case 'context':
        if (contextPosition) {
          setX(event.data.nativeEvent.pageX)
          setY(event.data.nativeEvent.pageY)
          setShow(true)
        }
        break
      case 'open':
        if (contextPosition) return
        if (touchPosition) {
          setX(event.data.nativeEvent.pageX)
          setY(event.data.nativeEvent.pageY)
        } else {
          setAnchorEl(event.data?.$el)
        }
        setShow(true)
        break
      case 'close':
        setShow(false)
        break
      case 'escape':
        setShow(false)
        break
      case 'back':
        setShow(false)
        break
      case 'clickout':
        setShow(false)
        break
    }
  }

  return (
    <UIModal
      anchor={anchor}
      anchorEl={anchorRef?.current ?? anchorEl}
      className={`q-menu ${className}`}
      fitToHeight={fitToHeight}
      self={self}
      transitionShow={transitionShow}
      transitionHide={transitionHide}
      offsetLeft={offsetLeft}
      offsetRight={offsetRight}
      offsetTop={offsetTop}
      offsetBottom={offsetBottom}
      onExternalAction={onExternalAction}
      onClose={onCloseLocal}
      open={showX}
      persistent={persistent}
      x={x}
      y={y}
    >
      {children}
    </UIModal>
  )
}
QMenu.displayName = 'QMenu'
type TQMenuProps = TBaseProps & {
  /**
   * @doc:attr
   */
  anchor?: TAnchor

  /**
   * @doc:attr
   */
  anchorRef?: string | any

  /**
   * @doc:attr
   */
  contextPosition?: boolean

  /**
   * @doc:attr
   */
  fitToHeight?: boolean

  /**
   * @doc:attr
   */
  offsetLeft?: number

  /**
   * @doc:attr
   */
  offsetRight?: number

  /**
   * @doc:attr
   */
  offsetTop?: number

  /**
   * @doc:attr
   */
  offsetBottom?: number

  /**
   * @doc:attr:type event
   */
  onClose?: () => void

  /**
   * @doc:attr:type event
   */
  onOpen?: () => void

  /**
   * @doc:attr
   */
  persistent?: boolean

  /**
   * @doc:attr
   */
  self?: TAnchor

  /**
   * @doc:attr
   */
  show?: boolean

  /**
   * @doc:attr
   */
  transition?: string

  /**
   * @doc:attr
   */
  transitionShow?: string

  /**
   * @doc:attr
   */
  transitionHide?: string

  /**
   * @doc:attr
   */
  touchPosition?: boolean
}
