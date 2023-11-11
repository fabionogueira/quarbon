import { Meta, Page, Story, Header, Props } from '@docs/components'
import { QButton, QButtonGroup } from '@quarbon/ui'
// @doc:story ButtonGroupOnlyIconStory, ButtonGroupMixedStory
import { Cb4K, CbAccount, CbActivity } from '@quarbon/icons/cb'
// @doc:story:end
import { Playground } from '@docs/components/Playground'

Meta.set({
  name: 'Components/ButtonGroup',
  custom() {
    return (
      <Page component={QButtonGroup} className="docs-buttongroup">
        <Header />
        <Props />
        <Playground
          custom={(props: any) => {
            return (
              <div>
                <QButtonGroup {...props}>
                  <QButton label="button 01" flat />
                  <QButton label="button 02" flat />
                  <QButton label="button 03" flat />
                </QButtonGroup>
              </div>
            )
          }}
        />

        <Story id="ButtonGroupBasicStory" label="Basic" source={ButtonGroupBasicStory} />
        <Story id="ButtonGroupOnlyIconStory" label="OnlyIcon" source={ButtonGroupOnlyIconStory} />
        <Story id="ButtonGroupMixedStory" label="Mixed" source={ButtonGroupMixedStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function ButtonGroupBasicStory() {
  return (
    <QButtonGroup>
      <QButton label="button 01" flat />
      <QButton label="button 02" flat />
      <QButton label="button 03" flat />
    </QButtonGroup>
  )
}

/**
 * @doc:story
 */
function ButtonGroupOnlyIconStory() {
  return (
    <QButtonGroup>
      <QButton icon={<Cb4K />} flat />
      <QButton icon={<CbAccount />} flat />
      <QButton icon={<CbActivity />} flat />
    </QButtonGroup>
  )
}

/**
 * @doc:story
 */
function ButtonGroupMixedStory() {
  return (
    <QButtonGroup>
      <QButton icon={<Cb4K />} label="button 01" flat />
      <QButton icon={<CbAccount />} flat />
      <QButton icon={<CbActivity />} label="button 03" iconAlign="right" flat />
    </QButtonGroup>
  )
}
