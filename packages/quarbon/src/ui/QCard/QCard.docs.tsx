import { Meta, Page, Header, Props, Story } from '@docs/components'
import { lorem1, lorem2 } from '@docs/lorem'
import { QButton, QCard, QCardActions, QCardSection, QSeparator } from '@quarbon/ui'

Meta.set({
  name: 'Components/Card',
  custom() {
    return (
      <Page component={QCard} className="docs-qcard">
        <Header />
        <Props />
        <Props component={QCardSection}/>
        <Props component={QCardActions}/>
        <Story id="QCardBasicStory" label="Basic cards" source={QCardBasicStory} />
        <Story id="QCardActionsStory" label="Actions" source={QCardActionsStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function QCardBasicStory() {
  return (
    <>
      <QCard>
        <QCardSection>{lorem1}</QCardSection>
      </QCard>

      <QCard
        style={{
          color: '#fff',
          background: 'radial-gradient(circle, #b3b3b3 0%, #262626 100%)',
        }}
      >
        <QCardSection>
          <h6>Our Changing Planet</h6>
          <div className="text-subtitle2">by John Doe</div>
        </QCardSection>
        <QCardSection>{lorem2}</QCardSection>
      </QCard>

      <QCard>
        <QCardSection>{lorem1}</QCardSection>
        <QSeparator inset />
        <QCardSection>{lorem1}</QCardSection>
      </QCard>
    </>
  )
}

/**
 * @doc:story
 */
function QCardActionsStory() {
  return (
    <QCard>
      <QCardSection>
        <h6>Title Example</h6>
      </QCardSection>
      <QSeparator />
      <QCardSection>
        {lorem1}
      </QCardSection>
      <QCardActions>
        <QButton>Button Example</QButton>
      </QCardActions>
    </QCard>
  )
}
