import { useState } from 'react'
import { Page, Meta, Header } from '@docs/components'
import { QTextbox, QToolbar } from '@quarbon/ui'
import * as icons from '@quarbon/icons/cb'
import { CbSearch } from '@quarbon/icons/cb'
import { Dialog } from './plugins/Dialog'

Meta.set({
  name: 'Icons',
  custom: IconsDocs,
})

let timer: any
function debounce(func: () => void, timeout = 600) {
  clearTimeout(timer)
  timer = setTimeout(() => func(), timeout)
}

export function IconsDocs() {
  const [filter, setFilter] = useState('')

  let count = 0

  function onChange(text: string) {
    debounce(() => setFilter(text.length > 1 ? text.toLocaleLowerCase() : ''))
  }

  function onClick(key: string) {
    const code = `<${key} />`

    navigator.clipboard.writeText(code).then(() => {
      Dialog.notifySuccess(`"${code}" copied!!!`)
    })
  }

  return (
    <Page>
      <Header component={{ displayName: 'Icons' }} description="Icons descriptions" />

      <QToolbar
        className="shadow"
        style={{
          marginBottom: 15,
          position: 'sticky',
          top: -25,
          zIndex: 1,
        }}
      >
        <QTextbox name="" className="col" outlined prepend={<CbSearch />} onChange={onChange} />
      </QToolbar>

      <section>
        <div className="grid-6 grid-xs-3 grid-xl-8">
          {Object.keys(icons).map((key) => {
            const Icon = (icons as any)[key]

            if (filter && !key.toLocaleLowerCase().includes(filter)) {
              return null
            }

            count++

            return (
              <div
                key={key}
                className="grid__cell col justify-center align-center q-clickable q-hover"
                onClick={() => onClick(key)}
              >
                <div
                  style={{
                    fontSize: 10,
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: 10,
                  }}
                >
                  {key}
                </div>
                <div>
                  <Icon size={32} />
                </div>
              </div>
            )
          })}
          {count == 0 && <p style={{ padding: 20 }}>Not found</p>}
        </div>
      </section>
    </Page>
  )
}
