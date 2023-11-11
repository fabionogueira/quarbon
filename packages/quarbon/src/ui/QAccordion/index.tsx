import { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { createClassName, cssMapBase } from '@quarbon/utils/css'
import { TBaseProps } from '@quarbon/types'
import { QAccordionContext, TQAccordionContext } from '@quarbon/ui/QAccordion/QAccordionContext'
import { CbChevronDown } from '@quarbon/icons/cb'
import './QAccordion.scss'

const cssMap: any = {
  color: cssMapBase.color,
  bordered: { true: 'q-accordion--bordered' },
  disabled: { true: 'q-accordion--disabled' },
  iconAlign: { left: 'q-accordion--icon-left' },
}
const defaults = {}

/**
 * @doc:component
 */
export const QAccordion = forwardRef<HTMLDivElement, TQAccordionProps>((props, _) => {
  const { children, active, activeClass = '', style, toggle, onChange } = props

  const css = createClassName(cssMap, props, 'q-accordion', defaults)
  const [activeChild, seActiveChild] = useState(active)
  const ctx: TQAccordionContext = {
    active: activeChild,
    activeClass,
    toggle,
    // indicator,
    // color,
    setActive(name: string) {
      seActiveChild(name)
      onChange?.(name)
    },
  }

  // #IFDOC
  globalThis.setProps?.(props)
  // #ENDIF

  return (
    <div data-container="true" className={css} style={style}>
      <QAccordionContext.Provider value={ctx}>{children}</QAccordionContext.Provider>
    </div>
  )
})
QAccordion.displayName = 'QAccordion'

type TQAccordionProps = TBaseProps & {
  /**
   * @doc:attr
   * @doc:attr:control false
   */
  active?: string

  /**
   * @doc:attr
   * @doc:attr:control false
   */
  activeClass?: string

  /**
   * @doc:attr
   */
  bordered?: boolean

  /**
   * @doc:attr
   * @doc:attr:default right
   * @doc:attr:control { "type":"select", "options": ["left", "right"] }
   */
  iconAlign?: 'left' | 'right'

  /**
   * @doc:attr
   */
  toggle?: boolean

  /**
   * @doc:attr
   * @doc:attr:type event
   */
  onChange?: (name: string) => void
}

const cssMapItem: any = {
  color: cssMapBase.color,
  disabled: { true: 'q-accordion-item--disabled' },
}
const defaultsItem = {}

/**
 * @doc:component
 */
export const QAccordionItem = forwardRef<HTMLDivElement, TQAccordionItemProps>((props, _) => {
  const { children, opened, style, label, icon, name } = props
  const css = createClassName(cssMapItem, props, 'col q-accordion-item', defaultsItem)
  const ctx = useContext<TQAccordionContext>(QAccordionContext)
  const bodyElement = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(0)
  const [init, setInit] = useState(false)
  const [openedState, setOpened] = useState(opened ?? false)
  const show = ctx.toggle ?? false ? ctx.active == name : openedState
  const activeClass = !ctx.toggle ? (openedState ? ctx.activeClass : '') : ctx.active == name ? ctx.activeClass : ''

  function onHeadClick(): void {
    if (ctx.toggle ?? false) {
      ctx.setActive(show ?? false ? '' : name)
    } else {
      setOpened(!openedState)
    }
  }

  function showBody() {
    setHeight(bodyElement.current?.scrollHeight)
  }

  function hideBody() {
    const el = bodyElement.current as HTMLElement
    const parent = el.parentNode as HTMLElement

    parent.style.height = `${el?.scrollHeight}px`
    setHeight(0)
  }

  function onTransitionEnd() {
    if (show) setHeight(undefined)
  }

  useEffect(() => {
    show && setHeight(undefined)
    setInit(true)
  }, [])

  useEffect(() => {
    if (!init) return
    show ? showBody() : hideBody()
  }, [show])

  return (
    <div
      data-container="true"
      className={`${css} ${activeClass ?? ''} ${show ? 'q-accordion-item--opened' : ''}`}
      style={style}
    >
      <div
        tabIndex={-1}
        className="row align-center q-clickable q-hover q-focusable q-accordion-item__head"
        onClick={onHeadClick}
      >
        <div className="col">
          <div className="q-accordion-item__label">{label}</div>
        </div>
        <div className="q-accordion-item__icon">{icon || <CbChevronDown size={16} />}</div>
      </div>
      <div className="q-accordion-item__wrapper" style={{ height }} onTransitionEnd={onTransitionEnd}>
        <div ref={bodyElement} className="q-accordion-item__content">
          {children}
        </div>
      </div>
    </div>
  )
})
QAccordionItem.displayName = 'QAccordionItem'
type TQAccordionItemProps = TBaseProps & {
  /**
   * @doc:attr
   */
  opened?: boolean

  /**
   * @doc:attr
   */
  icon?: any

  /**
   * @doc:attr
   */
  label: any

  /**
   * @doc:attr
   */
  name: string
}
