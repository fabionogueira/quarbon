import { useState } from 'react'
import { Highlight } from '@docs/components/Highlight'
import { codes } from '@quarbon/.docs/definition'

type TStoryProps = {
  source?: any
  children?: any
  code?: string
  id: string
  label: string
  className?: string
  style?: any
  component?: any
}

export function Story(props: TStoryProps) {
  const [show, showCode] = useState(false)
  const { id, label, style = {}, className = '' } = props
  const source: any = (codes as any)[id]?.source

  function onShowCodeClick() {
    showCode(!show)
  }

  return (
    <div data-container="" className="canvas">
      <div className="canvas__title">{label}</div>
      <button className="canvas__code-button" onClick={onShowCodeClick}>
        code
      </button>
      <div style={style} className={`canvas__content ${className}`}>
        {props.source ? <props.source /> : props.children}
      </div>

      {show && <Highlight language="xml" code={source} />}
    </div>
  )
}
