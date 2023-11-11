import { useState } from 'react'
import { Header, Meta, Page, Playground, Props, Story } from '@docs/components'
import { QButton, QSeparator, QToolbar, QToolbarTitle } from '@quarbon/ui'
// @doc:story QToolbarBasicStory, QToolbarGroupedStory, QToolbarWithChildrenStory
import { CbLogin, CbMenu, CbNotification, CbOverflowMenuVertical, CbSwitcher, CbUserAvatar } from '@quarbon/icons/cb'
// @doc:story:end

Meta.set({
  name: 'Components/Toolbar',
  custom() {
    return (
      <Page component={QToolbar} className="docs-qtoolbar">
        <Header />
        <Props />
        <Playground />
        <Story id="QToolbarBasicStory" label="Basic" source={QToolbarBasicStory} />
        <Story id="QToolbarGroupedStory" label="Grouped" source={QToolbarGroupedStory} />
        <Story id="QToolbarWithChildrenStory" label="With Children" source={QToolbarWithChildrenStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function QToolbarBasicStory() {
  return (
    <div className="docs-qtoolbar__container">
      <QToolbar dark>
        <QButton flat icon={<CbMenu />} />
        <QToolbarTitle>
          <span>
            IBM <strong>[Platform]</strong>
          </span>
        </QToolbarTitle>
        <QButton flat icon={<CbOverflowMenuVertical />} />
      </QToolbar>
      <QToolbar>
        <QButton flat icon={<CbMenu />} />
        <QToolbarTitle>
          <span>
            IBM <strong>[Platform]</strong>
          </span>
        </QToolbarTitle>
        <QButton flat icon={<CbOverflowMenuVertical />} />
      </QToolbar>
    </div>
  )
}

/**
 * @doc:story
 */
function QToolbarGroupedStory() {
  return (
    <>
      <QToolbar dark>
        <QButton flat icon={<CbMenu />} />
        <QToolbarTitle>
          <span>
            IBM <strong>[Platform]</strong>
          </span>
        </QToolbarTitle>
        <QButton flat icon={<CbOverflowMenuVertical />} />
      </QToolbar>
      <QToolbar dark inset>
        <QToolbarTitle>
          <span>
            <strong>Quarbon</strong> UI Toolbar
          </span>
        </QToolbarTitle>
      </QToolbar>
    </>
  )
}

/**
 * @doc:story
 */
function QToolbarWithChildrenStory() {
  const [logged, setLogged] = useState(false)

  return (
    <div className="docs-qtoolbar__container">
      <QToolbar dark>
        <QButton flat icon={<CbMenu />} />
        <QSeparator />
        <QToolbarTitle>Buttons</QToolbarTitle>
        <QButton flat icon={<CbNotification />} />
        <QSeparator />
        <QButton
          flat
          icon={logged ? <CbUserAvatar /> : <CbLogin />}
          onClick={() => {
            setLogged(!logged)
          }}
        />
        <QSeparator />
        <QButton flat icon={<CbSwitcher />} />
      </QToolbar>
    </div>
  )
}
