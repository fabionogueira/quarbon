import { forwardRef, useCallback, useLayoutEffect, useRef, useState } from 'react'
import { createClassName } from '@quarbon/utils/css'
import { TBaseProps } from '@quarbon/types'
import { CbChevronLeft, CbChevronRight } from '@quarbon/icons/cb'
import { QTabsContext } from './QTabsContext'
import './QTabs.scss'

const cssMap: any = {
  vertical: { true: 'q-tabs--vertical' },
  fill: { true: 'q-tab--fill' },
  align: {
    left: 'q-tabs--left',
    right: 'q-tabs--right',
    center: 'q-tabs--center',
    justify: 'q-tabs--justify',
  },
}
const defaults = {
  align: 'center',
  color: 'primary',
  fill: true,
}

/**
 * @doc:component
 */
export const QTabs = forwardRef<HTMLDivElement, TTabsProps>((props, ref) => {
  const { children, active, style, activeClass = '', indicator = 'top', onChange } = props
  const elRef = useRef(null)
  const elInner = useRef(null)
  const [activeTab, setActiveTab] = useState(active)
  const [rightArrow, setRightArrow] = useState(false)
  const [leftArrow, setLeftArrow] = useState(true)
  const [marginLeft, setMarginLeft] = useState(0)
  const ctx: any = {
    active: activeTab,
    activeClass,
    indicator,
    setActive(name: string) {
      setActiveTab(name)
      onChange?.(name)
    },
  }
  const cls = createClassName(cssMap, props, 'q-tabs', defaults)
  const getRect = useCallback(() => {
    if (!(elInner as any).current) return null

    const el: HTMLDivElement = (elInner as any).current
    const lastChild: HTMLDivElement = el.lastChild as any
    const r1 = el.getBoundingClientRect()
    const r2 = lastChild.getBoundingClientRect()
    const x1 = r2.left + r2.width - marginLeft
    const x2 = r1.left + r1.width

    return {
      x1,
      x2,
    }
  }, [marginLeft])

  ref = ref ?? elRef

  useLayoutEffect(() => {
    function handleResize() {
      const rect = getRect()

      if (!rect) return
      const showRightArrow = rect.x1 > rect.x2

      if (!showRightArrow) {
        setMarginLeft(0)
      }

      setLeftArrow(marginLeft < 0)
      setRightArrow(showRightArrow)
    }

    window.addEventListener('debounce-resize', handleResize)
    handleResize()

    return () => window.removeEventListener('debounce-resize', handleResize)
  }, [getRect, marginLeft, ref])

  function onClickRightArrow() {
    const l = marginLeft - 100
    const rect = getRect()
    if (!rect) return
    if (rect.x1 < rect.x2 - l) {
      setMarginLeft(-(rect.x1 - rect.x2) - 10)
    } else {
      setMarginLeft(l)
    }
  }
  function onClickLeftArrow() {
    const l = marginLeft + 100
    setMarginLeft(l > 0 ? 0 : l)
  }

  return (
    <QTabsContext.Provider value={ctx}>
      <div className={cls} style={style} ref={ref}>
        {rightArrow && (
          <div className="q-tabs__right-arrow q-clickable q-hover" onClick={onClickRightArrow}>
            <CbChevronRight size={32} />
          </div>
        )}
        {leftArrow && (
          <div className="q-tabs__left-arrow q-clickable q-hover" onClick={onClickLeftArrow}>
            <CbChevronLeft size={32} />
          </div>
        )}
        <div ref={elInner} className="q-tabs__inner" style={{ marginLeft }}>
          {children}
        </div>
      </div>
    </QTabsContext.Provider>
  )
})
QTabs.displayName = 'QTabs'
type TTabsProps = TBaseProps & {
  /**
   * @doc:attr
   */
  vertical?: boolean

  /**
   * @doc:attr:type string
   * @doc:attr:control { "type":"select", "options":[ "left", "right", "center", "justify" ]}
   */
  align?: 'left' | 'right' | 'center' | 'justify'

  /**
   * @doc:attr:control false
   * @doc:attr:description the css class that will be applied to the active tab
   */
  activeClass?: string

  /**
   * @doc:attr:control false
   * @doc:attr:description current tab name
   */
  active?: string

  /**
   * @doc:attr:type string
   * @doc:attr:control { "type":"select", "options": [ "top", "bottom" ] }
   */
  indicator?: 'top' | 'bottom'

  /**
   * @doc:attr:control { "value":true }
   */
  fill?: boolean

  /**
   * @doc:attr:type event
   */
  onChange?: (name: string) => void
}
