import { useContext } from 'react'
import { PageContext } from '@docs/components/Page'

export function Header(props: THeaderProps) {
  const ctx = useContext(PageContext)
  const component = props.component ? props.component : ctx.component
  const componentName = component?.displayName ?? component?.name ?? "Undefined name"

  return (
    <section>
      <h1>{props.title ?? componentName}</h1>
      {props.description}
    </section>
  )
}

type THeaderProps = {
  component?: any
  title?: any
  description?: any
}