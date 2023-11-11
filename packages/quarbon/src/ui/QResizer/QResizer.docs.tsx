import { useState } from 'react'
import { Meta, Page, Story, Header, Props } from '@docs/components'
import { QResizer } from '@quarbon/ui'

Meta.set({
  name: 'Components/Resizer',
  custom() {
    return (
      <Page component={QResizer} className="docs-resizer">
        <Header />
        <Props />
        <Story id="QResizerVerticalStore" label="Vertical" source={Vertical} />
        <Story id="QResizerHorizontalStory" label="Horizontal" source={Horizontal} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function Vertical() {
  const [size1, setSize1] = useState(0)
  const [size2, setSize2] = useState(0)

  return (
    <div className="col">
      <div className="row">
        <div className="q-card q-card--bordered q-card__section" style={{ maxWidth: 160 }}>
          Size {size1 ? `(${size1})` : ''}
        </div>
        <QResizer min={110} onDrag={(width: number) => setSize1(width)} />
        <div className="q-card q-card--bordered q-card__section">block</div>
      </div>

      <div className="row">
        <div className="q-card q-card--bordered q-card__section">block</div>
        <QResizer max={500} min={110} target="after" onDrag={(width: number) => setSize2(width)} />
        <div className="q-card q-card--bordered q-card__section" style={{ maxWidth: 160 }}>
          Size {size2 ? `(${size2})` : ''}
        </div>
      </div>
    </div>
  )
}

/**
 * @doc:story
 */
function Horizontal() {
  const [size1, setSize1] = useState(0)
  const [size2, setSize2] = useState(0)

  return (
    <div className="col">
      <div className="col">
        <div className="q-card q-card--bordered q-card__section" style={{ marginBottom: 0 }}>
          Size {size1 ? `(${size1})` : ''}
        </div>
        <QResizer min={45} orientation="horizontal" onDrag={(width: number) => setSize1(width)} />
        <div className="q-card q-card--bordered q-card__section">block</div>
      </div>

      <div className="col">
        <div className="q-card q-card--bordered q-card__section" style={{ marginBottom: 0 }}>
          block
        </div>
        <QResizer min={45} orientation="horizontal" target="after" onDrag={(width: number) => setSize2(width)} />
        <div className="q-card q-card--bordered q-card__section">Size {size2 ? `(${size2})` : ''}</div>
      </div>
    </div>
  )
}
