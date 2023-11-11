import { createContext, forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { TBaseProps } from '@quarbon/types'
import { createClassName } from '@quarbon/utils/css'
import { CbChevronDown } from '@quarbon/icons/cb'
import { getPlugin } from '@quarbon/index'
import './QTree.scss'

const QTreeContext = createContext<TQTreeContext>({
  selected: '',
  setSelected: (_) => undefined,
})
const QTreeCssMap = {
  accordion: { true: 'q-tree--accordion' },
  checked: { true: 'q-tree--checked' },
  disabled: { true: 'q-disabled q-tree--disabled' },
  skeleton: { true: 'q-tree-skeleton' },
}
const defaults = {
  accordion: true,
}

function setSelected(node: any, selected: boolean) {
  // node.selected = selected;

  while (node.parent) {
    node.parent.active = selected

    if (selected) {
      node.parent.opened = true
    }

    node = node.parent
  }
}
function processNode(node: any, parent: any, selected: string) {
  node.parent = parent

  if (node.id == selected) {
    setSelected(node, true)
  }

  node.children?.forEach((n: any) => {
    processNode(n, node, selected)
  })
}

/**
 * @doc:component
 */
export const QTree = forwardRef<HTMLElement, TQTreeProps>((props, ref) => {
  const { nodes, style, selected, onChange } = props
  const [selectedId, setSelectedId] = useState(selected)
  const css = createClassName(QTreeCssMap, props, 'q-tree', defaults)
  const routePlugin = getPlugin('router')
  const location = routePlugin.useLocation?.()
  const ctx: TQTreeContext = {
    selected: selectedId,
    setSelected: (node: TNode) => {
      setSelectedId(node.id)
      if (onChange) onChange(node)
    },
  }
  // force render when location.pathname is changed
  useEffect(() => undefined, [location?.pathname])

  useEffect(() => {
    setSelectedId(selected)
  }, [selected])

  if (!(nodes as any).$initialized) {
    nodes?.forEach((node) => {
      processNode(node, null, selected as string)
    })
    ;(nodes as any).$initialized = true
  }

  return (
    <QTreeContext.Provider value={ctx}>
      <nav ref={ref} className={css} style={style}>
        <ul className="q-tree__node q-tree-node--level-0">
          {nodes?.map((node, index) => {
            return <QTreeNode key={index} node={node} level={1} />
          })}
        </ul>
      </nav>
    </QTreeContext.Provider>
  )
})
QTree.displayName = 'QTree'
type TQTreeProps = TBaseProps & {
  /**
   * @doc:attr
   */
  accordion?: boolean

  /**
   * @doc:attr
   */
  checked?: boolean

  /**
   * @doc:attr:control false
   */
  name?: string

  /**
   * @doc:attr:control false
   */
  nodes?: TNode[]

  /**
   * @doc:attr:type event
   */
  onChange?: (node: TNode) => void

  /**
   * @doc:attr:control false
   */
  rules?: any

  /**
   * @doc:attr:control false
   */
  selected?: string

  /**
   * @doc:attr
   */
  skeleton?: boolean

  /**
   * @doc:attr
   */
  toggle?: boolean
}

const QTreeNode = (props: TQTreeNodeProps) => {
  const { node, level } = props
  const [opened, setOpened] = useState(node.opened)
  const [activeTmp, setActiveTmp] = useState(false)
  const [height, setHeight] = useState<number | undefined>(opened ? undefined : 0)
  const children = node.children
  const childrenRef = useRef<HTMLDivElement>(null)
  const ctx = useContext<TQTreeContext>(QTreeContext)
  const selected = node.to !== undefined ? location.pathname == node.to : node.id && ctx.selected === node.id
  const routePlugin = getPlugin('router')
  const navigate = node.to ? routePlugin.useNavigate?.() : null
  const heightNormalize = useCallback(() => {
    setHeight(opened ? childrenRef.current?.scrollHeight : 0)
  }, [opened])

  let cls = opened ? 'q-tree-node-header--opened ' : ''

  if (children && node.active) {
    cls += 'q-tree-node-header--active '
  }

  if (selected) {
    cls += 'q-tree-node-header--selected '
  }

  if (activeTmp || (node.active && !children)) {
    cls += 'q-tree-node-header--active-tmp '
  }

  useEffect(() => {
    heightNormalize()
  }, [heightNormalize, opened])

  async function onClick() {
    if (node.id === ctx.selected || activeTmp) {
      return
    }

    if (children) {
      opened && heightNormalize()
      return setOpened(!opened)
    }

    if (node.id === null) {
      return
    }

    if (node.onClick) {
      setActiveTmp(true)
      const result = await node.onClick()
      setActiveTmp(false)

      if (!result) {
        return
      }
    }

    if (!node.to) {
      return ctx.setSelected(node)
    }

    navigate?.(node.to)
  }
  function onTransitionEnd() {
    if (opened) {
      setHeight(undefined)
    }
  }
  function renderChildren(nodes: TNode[]) {
    return (
      <ul className={`q-tree__node q-tree-node--level-${level}`}>
        {nodes.map((node, index) => {
          return <QTreeNode key={index} node={node} level={level + 1} />
        })}
      </ul>
    )
  }

  return (
    <li>
      <div className={`q-tree-node-header ${cls}row align-center q-clickable q-hover`} onClick={onClick}>
        <div className="col q-tree-node-header__label">{node.label}</div>
        {children && <div className="q-tree-node-header__icon">{node.icon || <CbChevronDown size={16} />}</div>}
      </div>

      <div ref={childrenRef} className="q-tree-node__children" style={{ height }} onTransitionEnd={onTransitionEnd}>
        {children ? renderChildren(children) : null}
      </div>
    </li>
  )
}
QTreeNode.displayName = 'QTreeNode'
type TQTreeNodeProps = TBaseProps & {
  node: TNode
  level: number
}

type TQTreeContext = {
  selected?: string
  setSelected: (node: TNode) => void
}
type TNodeOnClickCallback = () => Promise<boolean> | boolean | void
export type TNode = {
  children?: TNode[]
  icon?: any
  id: string
  label: string
  active?: boolean
  opened?: boolean
  onClick?: TNodeOnClickCallback
  to?: string
  data?: any
}
