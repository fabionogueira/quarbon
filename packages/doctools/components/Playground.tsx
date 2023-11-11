import { useContext, useState } from 'react'
import { TControl } from '@docs/components/Meta'
import { PageContext } from '@docs/components/Page'
import { attrs } from '@quarbon/.docs/definition'

export function Playground(props: TPlaygroundProps) {
  const ctx = useContext(PageContext)
  const component = props.component ? props.component : ctx.component
  const componentName = component?.displayName ?? component?.name
  const attributes: any = (attrs as any)[componentName]?.attrs ?? {}
  const Comp = props.custom || component
  const [propsComponent, setPropsComponent] = useState(initialValues())

  if (!component) return null
  if (props.custom === false) return null

  propsComponent.setProps = (newProps: any) => {
    if (propsComponent.$setPropsIgnore) {
      delete propsComponent.$setPropsIgnore
      return
    }

    const np = {
      ...propsComponent,
      ...newProps,
    }
    delete np.setProps
    delete np.$setPropsIgnore
    const changed =
      Object.entries(np).findIndex(([k, v]) => {
        if (!'string number boolean undefined'.includes(typeof propsComponent[k])) return false
        if (propsComponent[k] != v) return true
      }) >= 0

    if (changed) {
      setPropsComponent(np)
    }
  }

  function initialValues() {
    const obj: any = JSON.parse(JSON.stringify(attributes))
    const pp: any = {}

    Object.keys(obj).forEach((key) => {
      let value = (attributes[key].control as TControl)?.value

      if (value === undefined) {
        value = attributes[key].default
      }

      if (value !== undefined) {
        pp[key] = value
      }
    })

    return pp
  }

  function setPropValue(name: string, value: any) {
    setPropsComponent({
      ...propsComponent,
      $setPropsIgnore: true,
      [name]: value,
    })
  }

  return (
    <section className="playground props">
      <h2>Playground</h2>
      <hr />
      <div className="row playground__component">
        <div className="col align-center justify-center playground__component-inner">
          <Comp component={component} {...propsComponent} />
        </div>
        <div className="col playground__props">
          <table border={1}>
            <thead>
              <tr>
                <th className="props__name">name</th>
                <th>value</th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(attributes)
                .sort()
                .map((key) => {
                  const def = attributes[key]

                  if (def.type == 'event' || def.control === false) return null

                  return (
                    <tr key={key}>
                      <td className="props__name">{key}</td>
                      <td>
                        <Input
                          name={key}
                          props={def}
                          value={propsComponent[key]}
                          onChange={(name: string, value: any) => setPropValue(name, value)}
                        />
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

const Component = (props: any) => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <props.component {...props.props} />
    </div>
  )
}

const Input = (properties: any) => {
  const { props, name, value, onChange } = properties

  function defineValue(newValue: any) {
    onChange && onChange(name, newValue)
  }

  if (props.control?.type == 'select') {
    props.control.options = props.control.options.map((opt: any) => {
      if (typeof opt == 'string') {
        return {
          value: opt,
          label: opt,
        }
      }

      return opt
    })

    return (
      <div className="ctrl-select">
        <select
          value={value || ''}
          onChange={(event) => {
            const item = props.control.options[event.target.selectedIndex]
            defineValue(item.value)
          }}
        >
          {props.control.options.map((opt: any) => {
            return (
              <option key={opt.label} value={opt.label}>
                {opt.label}
              </option>
            )
          })}
        </select>
      </div>
    )
  }

  if (props.type == 'boolean') {
    return (
      <div className="ctrl-boolean">
        <label>
          true
          <input type="radio" checked={!!value} onChange={() => false} onClick={() => defineValue(true)} />
        </label>
        <label>
          false
          <input type="radio" checked={!value} onChange={() => false} onClick={() => defineValue(false)} />
        </label>
      </div>
    )
  }

  if (props.type == 'string') {
    return (
      <div className="ctrl-string">
        <input type="text" value={value || ''} onInput={(event) => defineValue((event.target as any).value)} />
      </div>
    )
  }

  if (props.type == 'number') {
    return (
      <div className="ctrl-number">
        <input type="number" value={value | 0} onInput={(event) => defineValue(Number((event.target as any).value))} />
      </div>
    )
  }

  return props.type
}

type TPlaygroundProps = {
  component?: any
  custom?: any
}
type TPlaygroundRenderComponent = {
  displayName: string
}

export type TPlaygroundRender = {
  component: TPlaygroundRenderComponent
  props: any
}
