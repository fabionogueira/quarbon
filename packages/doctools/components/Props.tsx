import { TProps } from '@docs/components/Meta'
import { attrs } from '@quarbon/.docs/definition'
import { useContext } from 'react'
import { PageContext } from '@docs/components/Page'

type TPropsProps = {
  definition?: TProps
  component?: any
  title?: string
}
export function Props(props: TPropsProps) {
  const { title } = props
  const ctx = useContext(PageContext)
  const component = props.component ? props.component : ctx.component
  const componentName = component?.displayName ?? component?.name

  if (!component) return null

  const componentAttrs: any = (attrs as any)[componentName]?.attrs

  return (
    <section className="props">
      <h2>{title || `${componentName} Props`}</h2>
      <hr />
      {!componentAttrs ? null : (
        <table border={1}>
          <thead>
            <tr>
              <th>name</th>
              <th>type</th>
              <th>default</th>
              <th>description</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(componentAttrs).map((key) => {
              const p = componentAttrs[key]
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{p.type}</td>
                  <td>{p.default}</td>
                  <td>{p.description}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </section>
  )
}
