import { createClassName } from '../../utils/css'
import { TBaseProps } from '@quarbon/types'
import './QCard.scss'

const QCardCssMap: any = {
  bordered: { true: 'q-card--bordered' },
  skeleton: { true: 'q-skeleton' },
}
const QCardCssMapDefaults: any = {
  bordered: true,
}
const QCardSectionCssMap: any = {
  horizontal: { true: 'q-card__section--horizontal' },
  skeleton: { true: 'q-skeleton' },
}
const QCardActionsCssMap: any = {
  skeleton: { true: 'q-skeleton' },
}

/**
 * @doc:component
 */
export function QCard(props: TCardProps) {
  const { children, style } = props
  const css = createClassName(QCardCssMap, props, 'col q-card', QCardCssMapDefaults)

  return (
    <div data-container="" className={css} style={style}>
      {children}
    </div>
  )
}
QCard.displayName = 'QCard'
type TCardProps = TBaseProps & {
  /**
   * @doc:attr
   */
  bordered?: boolean

  /**
   * @doc:attr
   */
  skeleton?: boolean
}

/**
 * @doc:component
 */
export function QCardSection(props: TCardSectionProps) {
  const { children, style } = props
  const css = createClassName(QCardSectionCssMap, props, 'q-card__section')

  return (
    <div data-container="" className={css} style={style}>
      {children}
    </div>
  )
}
QCardSection.displayName = 'QCardSection'
type TCardSectionProps = TBaseProps & {
  /**
   * @doc:attr
   */
  horizontal?: boolean

  /**
   * @doc:attr
   */
  skeleton?: boolean
}

/**
 * @doc:component
 */
export function QCardActions(props: TCardActionsProps) {
  const { children, style } = props
  const css = createClassName(QCardActionsCssMap, props, 'row justify-end q-card__actions')

  return (
    <div data-container="" className={css} style={style}>
      {children}
    </div>
  )
}
QCardActions.displayName = 'QCardActions'
type TCardActionsProps = TBaseProps & {
  /**
   * @doc:attr
   */
  bordered?: boolean

  /**
   * @doc:attr
   */
  skeleton?: boolean
}
