import { forwardRef } from 'react'
import { createClassName } from '@quarbon/utils/css'
import { TBaseProps } from '@quarbon/types'
import './QTable.scss'

const cssMap: any = {
  disabled: { true: 'q-table--disabled' },
  fixedRow: { true: 'q-table--fixed-row' },
  fixedCol: { true: 'q-table--fixed-col' },
}

/**
 * @doc:component
 */
export const QTable = forwardRef<HTMLDivElement, TQTableProps>((props, ref) => {
  const {
    columns = [],
    clickable,
    cellRender = defaultCellRender,
    footer,
    header,
    helperText,
    onClickRow,
    onClickCell,
    rows = [],
    skeleton,
    style,
    toolbar,
    title,
  } = props

  const css = createClassName(cssMap, props, 'q-table')

  function onClick(evt: any) {
    let index, row, data, td
    const target = evt.target
    const tr = target.closest('[data-qtable-dimension]')

    if (!clickable) return

    if (tr) {
      index = tr.getAttribute('data-qtable-row')
      row = rows[index]
      td = target.closest('td')

      onClickRow && onClickRow(row)

      if (td) {
        index = tr.getAttribute('data-qtable-row')
        data = row[columns[index].field!]
        onClickCell && onClickCell(data)
      }
    }
  }

  return (
    <div ref={ref} className={css} style={style}>
      {title && <h4>{title}</h4>}
      {helperText && <p className="text-subtitle1">{helperText}</p>}
      {header && <div>{header}</div>}
      {toolbar && <div className="row align-center q-table__toolbar">{toolbar}</div>}

      <div className="q-table__content">
        <table onClick={onClick}>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col.label || col.field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((dimension, index1) => (
              <tr className={clickable && !skeleton ? 'q-clickable q-hover' : ''} key={index1} data-qtable-row={index1}>
                {columns.map((col, index2) => (
                  <td key={index2} data-qtable-col={index2}>
                    {skeleton ? (
                      <div className="q-skeleton">{cellRender(dimension, col)}</div>
                    ) : (
                      cellRender(dimension, col)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footer && <div className="row align-center q-table__footer">{footer}</div>}
    </div>
  )
})
QTable.displayName = 'QTable'
type TQTableProps = TBaseProps & {
  /**
   * @doc:attr:control false
   */
  columns?: Array<TTableCol>

  /**
   * @doc:attr
   */
  clickable?: boolean

  /**
   * @doc:attr
   */
  cellRender?: (dimension: Record<string, any>, col: TTableCol) => any

  /**
   * @doc:attr
   */
  fixedRow?: boolean

  /**
   * @doc:attr
   */
  fixedCol?: boolean

  /**
   * @doc:attr
   */
  footer?: any

  /**
   * @doc:attr
   */
  header?: any

  /**
   * @doc:attr
   */
  helperText?: string

  /**
   * @doc:attr
   */
  onClickRow?: (row: any) => void

  /**
   * @doc:attr
   */
  onClickCell?: (cell: any) => void

  /**
   * @doc:attr:control false
   */
  rows?: Array<Record<string, any>>

  /**
   * @doc:attr
   */
  skeleton?: boolean

  /**
   * @doc:attr
   */
  title?: string

  /**
   * @doc:attr
   */
  toolbar?: any
}
export type TTableCol = {
  field: string
  label?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  format?: () => void
  render?: (dimension: Record<string, any>) => any
}

function defaultCellRender(dimension: Record<string, any>, col: TTableCol) {
  return col.render ? col.render(dimension) : dimension[col.field!]
}
