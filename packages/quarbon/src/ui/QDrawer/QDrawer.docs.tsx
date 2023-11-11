import { useState } from 'react'
import { Meta, Page, Story, Header, Props } from '@docs/components'
import { QButton, QDrawer, QToolbar, QToolbarTitle } from '@quarbon/ui'
// @doc:story QDrawerBasicStory
import { CbArrowLeft, CbArrowRight, CbMenu } from '@quarbon/icons/cb'
//@doc:story:end

Meta.set({
  name: 'Components/Drawer',
  custom() {
    return (
      <Page component={QDrawer} className="docs-drawer">
        <Header />
        <Props />
        <Story id="QDrawerBasicStory" label="Basic" source={QDrawerBasicStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function QDrawerBasicStory() {
  const [openLeft, setOpenLeft] = useState(true)
  const [openRight, setOpenRight] = useState(true)
  const [mini, setMini] = useState(false)

  function onClickLeftButton() {
    setOpenLeft(!openLeft)
  }

  function onClickRightButton() {
    setOpenRight(!openRight)
  }

  function onCLickMiniMode() {
    setMini(!mini)
  }

  return (
    <div style={{ height: 400, width: '100%', overflow: 'hidden' }} className="vbox">
      <QToolbar dark>
        <QButton flat icon={<CbMenu />} onClick={onClickLeftButton} />
        <QToolbarTitle>
          <span>
            IBM <strong>[Platform]</strong>
          </span>
        </QToolbarTitle>
        <QButton flat icon={<CbMenu />} onClick={onClickRightButton} />
      </QToolbar>

      <div className="client hbox">
        <QDrawer
          open={openLeft}
          mini={mini}
          overlay
          onClose={() => {
            setOpenLeft(false)
          }}
        >
          <QButton
            icon={mini ? <CbArrowRight /> : <CbArrowLeft />}
            flat
            onClick={onCLickMiniMode}
            style={{
              position: 'absolute',
              right: 4,
              bottom: 4,
            }}
          />
          {mini ? null : <div className="text-caption">Right Panel</div>}
        </QDrawer>
        <div className="client row align-center justify-center">
          <h6>Content area</h6>
        </div>
        <QDrawer open={openRight} slide="right">
          <div className="text-caption">Right Panel</div>
        </QDrawer>
      </div>
    </div>
  )
}
