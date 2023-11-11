import { useState } from 'react'
import { Meta, Page, Header, Props, Story } from '@docs/components'
import { QButton, QCheckbox, QField, QMenu, QSeparator } from '@quarbon/ui'
import { QList, QListItem } from '@quarbon/ui/QList'
import { QSelect, QSelectItem } from '@quarbon/ui/QSelect'
import { TAnchor } from '@quarbon/plugins/Modal'

Meta.set({
  name: 'Components/Menu',
  custom() {
    return (
      <Page component={QMenu} className="docs-qmenu">
        <Header />
        <Props />
        {/*<Playground />*/}
        <Story id="QMenuContextStory" label="Basic" source={QMenuContextStory} />
        <Story id="QMenuBasicStory" label="Basic" source={QMenuBasicStory} />
        <Story id="QMenuByPositionStory" label="Show by click position" source={QMenuByPositionStory} />
        <Story id="QMenuPositionStory" label="Position" source={QMenuPositionStory} />
        <Story id="QMenuIdeaStory" label="Idea for content" source={QMenuIdeaStory} />
        <Story id="QMenuShowPropertyStory" label="Using show property" source={QMenuShowPropertyStory} />
        <Story id="QMenuFitToHeightStory" label="Fit to height" source={QMenuFitToHeightStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function QMenuContextStory() {
  return (
    <div
      className="bg-secondary text-secondary-invert"
      data-open-modal={true}
      style={{ padding: 20, cursor: 'default' }}
    >
      Click me! Using contextPosition
      <QMenu contextPosition>
        <QList>
          <QListItem clickable data-close-modal>
            Close
          </QListItem>
          <QListItem clickable>Close All Tabs</QListItem>
          <QListItem clickable>Copy Path/Reference</QListItem>
          <QSeparator />
          <QListItem clickable>Pin Tab</QListItem>
          <QListItem clickable>Override File</QListItem>
        </QList>
      </QMenu>
    </div>
  )
}

/**
 * @doc:story
 */
function QMenuBasicStory() {
  return (
    <>
      <QButton color="primary">
        Basic menu
        <QMenu>
          <QList>
            <QListItem clickable data-close-modal>
              Close
            </QListItem>
            <QListItem clickable>Go To</QListItem>
            <QListItem clickable>Copy Path/Reference</QListItem>
            <QSeparator />
            <QListItem clickable>Pin Tab</QListItem>
            <QListItem clickable>Override File</QListItem>
          </QList>
        </QMenu>
      </QButton>
      <QButton color="positive" style={{ marginLeft: 20 }}>
        Persistent menu
        <QMenu persistent>
          <QList>
            <QListItem className="bg-secondary text-secondary-invert" clickable data-close-modal>
              Close
            </QListItem>
            <QSeparator />
            <QListItem clickable>Paste</QListItem>
            <QListItem clickable>Copy Path/Reference</QListItem>
            <QListItem clickable>Pin Tab</QListItem>
            <QListItem clickable>Override File</QListItem>
          </QList>
        </QMenu>
      </QButton>
    </>
  )
}

/**
 * @doc:story
 */
function QMenuByPositionStory() {
  return (
    <div
      className="bg-accent text-accent-invert"
      data-open-modal={true}
      style={{ padding: 20, margin: '0 10px', cursor: 'default' }}
    >
      Click me! Using touchPosition
      <QMenu touchPosition>
        <QList>
          <QListItem clickable data-close-modal>
            Close
          </QListItem>
          <QListItem clickable>Close All Tabs</QListItem>
          <QListItem clickable>Copy Path/Reference</QListItem>
          <QSeparator />
          <QListItem clickable>Pin Tab</QListItem>
          <QListItem clickable>Override File</QListItem>
        </QList>
      </QMenu>
    </div>
  )
}

/**
 * @doc:story
 */
function QMenuPositionStory() {
  const [anchor, setAnchor] = useState<TAnchor>('bottom left')
  const [self, setSelf] = useState<TAnchor>('top left')
  const positions: Array<TAnchor> = [
    'top right',
    'top left',
    'top middle',
    'bottom left',
    'bottom right',
    'bottom middle',
    'center left',
    'center right',
    'center middle',
  ]

  return (
    <div className="col">
      <p className="text-subtitle2 text-warning">TODO: Bug using "middle" position</p>
      <div className="row" style={{ marginTop: 20 }}>
        <QSelect label="Anchor position" value={anchor} onChange={(item: TAnchor) => setAnchor(item)}>
          {positions.map((p) => (
            <QSelectItem key={p} value={p} label={p} />
          ))}
        </QSelect>
        <QSelect
          label="Self position"
          value={self}
          onChange={(item: TAnchor) => setSelf(item)}
          style={{ marginLeft: 20 }}
        >
          {positions.map((p) => (
            <QSelectItem key={p} value={p} label={p} />
          ))}
        </QSelect>
      </div>
      <div className="row justify-center">
        <QButton color="primary">
          <span>Show menu</span>
          <QMenu anchor={anchor} self={self}>
            <QList>
              <QListItem clickable data-close-modal>
                Close
              </QListItem>
              <QListItem clickable>Close All Tabs</QListItem>
              <QListItem clickable>Copy Path/Reference</QListItem>
              <QSeparator />
              <QListItem clickable>Pin Tab</QListItem>
              <QListItem clickable>Override File</QListItem>
            </QList>
          </QMenu>
        </QButton>
      </div>
    </div>
  )
}

/**
 * @doc:story
 */
function QMenuIdeaStory() {
  return (
    <QButton>
      Account settings
      <QMenu className="docs-qmenu">
        <div className="row no-wrap idea">
          <div>
            <h6 style={{ paddingBottom: 16 }}>Settings</h6>
            <QField borderless>
              <QCheckbox checked={false} label="Use mobile data" />
            </QField>
            <QField borderless>
              <QCheckbox checked={true} label="Bluetooth" />
            </QField>
          </div>
          <QSeparator style={{ margin: '0 20px' }} />
          <div className="col">
            <img className="avatar" src="https://cdn.quasar.dev/img/avatar4.jpg" alt="Avatar" />
            <span className="text-subtitle1" style={{ marginTop: 16 }}>
              I Am Groot
            </span>
          </div>
        </div>
      </QMenu>
    </QButton>
  )
}

/**
 * @doc:story
 */
function QMenuShowPropertyStory() {
  const [show, setShow] = useState(false)

  return (
    <>
      <QButton color="primary" label={show ? 'Hide' : 'Show'} onClick={() => setShow(!show)} />

      <div>
        <QMenu show={show} persistent>
          <QList>
            <QListItem clickable data-close-modal>
              Close
            </QListItem>
            <QListItem clickable>Close All Tabs</QListItem>
            <QListItem clickable>Copy Path/Reference</QListItem>
            <QSeparator />
            <QListItem clickable>Pin Tab</QListItem>
            <QListItem clickable>Override File</QListItem>
          </QList>
        </QMenu>
      </div>
    </>
  )
}

/**
 * @doc:story
 */
function QMenuFitToHeightStory() {
  const [show, setShow] = useState(false)

  return (
    <>
      <QButton color="primary" label="fit to height" onClick={() => setShow(!show)} />
      <QMenu
        anchor="top right"
        anchorRef={document.body}
        fitToHeight
        onClose={() => setShow(false)}
        self="top right"
        show={show}
        transition="slide_right"
      >
        <QList>
          <QListItem clickable data-close-modal>
            Close
          </QListItem>
          <QListItem clickable>Go To</QListItem>
          <QListItem clickable>Copy Path/Reference</QListItem>
          <QSeparator />
          <QListItem clickable>Pin Tab</QListItem>
          <QListItem clickable>Override File</QListItem>
        </QList>
      </QMenu>
    </>
  )
}
