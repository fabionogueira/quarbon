import { useState } from 'react'
import { Header, Meta, Page, Props, Story, Playground } from '@docs/components'
import { QTabs, QTab, QButton, QCheckbox, QProgress, QCard, QCardSection } from '@quarbon/ui'
// @doc:story QTabsWithIconStory, QTabsCustomContentStory
import { CbAlarm, CbMailAll, CbOverflowMenuVertical, CbVideo } from '@quarbon/icons/cb'
// @doc:story:end

Meta.set({
  name: 'Components/Tabs',
  custom() {
    return (
      <Page component={QTabs} className="docs-qtabs">
        <Header />
        <Props />
        <Props component={QTab} />
        <Playground
          custom={(props: any) => (
            <QTabs active="mails" {...props}>
              <QTab name="mails" label="Mails" />
              <QTab name="alarms" label="Alarms" />
              <QTab name="movies" label="Movies" />
            </QTabs>
          )}
        />
        <Story id="QTabsBasicStory" label="Basic" source={QTabsBasicStory} />
        <Story id="QTabsBottomStory" label="Indicator Bottom" source={QTabsBottomStory} />
        <Story id="QTabsWithIconStory" label="With icon" source={QTabsWithIconStory} />
        <Story id="QTabsCustomContentStory" label="Custom content" source={QTabsCustomContentStory} />
        <Story id="QTabsWithPanelStory" label="With panel" source={QTabsWithPanelStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function QTabsBasicStory() {
  return (
    <QTabs active="tab1">
      <QTab name="tab1" label="Mails" />
      <QTab name="tab2" label="Alarms" />
      <QTab name="tab3" label="Movies" />
    </QTabs>
  )
}

/**
 * @doc:story
 */
function QTabsBottomStory() {
  return (
    <QTabs active="tab1" indicator="bottom" fill={false}>
      <QTab name="tab1" label="Mails" />
      <QTab name="tab2" label="Alarms" />
      <QTab name="tab3" label="Movies" />
    </QTabs>
  )
}

/**
 * @doc:story
 */
function QTabsWithIconStory() {
  return (
    <QTabs active="tab1">
      <QTab name="tab1" label="Mails" icon={<CbMailAll />} />
      <QTab name="tab2" label="Alarms" icon={<CbAlarm />} />
      <QTab name="tab3" label="Movies" icon={<CbVideo />} />
    </QTabs>
  )
}

/**
 * @doc:story
 */
function QTabsCustomContentStory() {
  return (
    <QTabs active="tab1">
      <QTab name="tab1">
        Menu
        <QButton flat icon={<CbOverflowMenuVertical />} style={{ marginLeft: 20 }} />
      </QTab>
      <QTab name="tab2">
        Checkbox
        <QCheckbox checked={false} style={{ marginLeft: 20 }} />
      </QTab>
      <QTab name="tab3">
        <QProgress label="Progress" indeterminate style={{ width: 100 }} />
      </QTab>
    </QTabs>
  )
}

/**
 * @doc:story
 */
function QTabsWithPanelStory() {
  const [active, setActive] = useState('tab1')
  return (
    <div className="col">
      <QTabs
        active={active}
        onChange={(name: string) => {
          setActive(name)
        }}
      >
        <QTab name="tab1" label="Mails" />
        <QTab name="tab2" label="Alarms" />
        <QTab name="tab3" label="Movies" />
      </QTabs>
      {active == 'tab1' && (
        <QCard bordered={false}>
          <QCardSection>Mails contents</QCardSection>
        </QCard>
      )}
      {active == 'tab2' && (
        <QCard bordered={false}>
          <QCardSection>Alarms contents</QCardSection>
        </QCard>
      )}
      {active == 'tab3' && (
        <QCard bordered={false}>
          <QCardSection>Movies contents</QCardSection>
        </QCard>
      )}
    </div>
  )
}
