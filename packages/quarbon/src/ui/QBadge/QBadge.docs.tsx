import { Page, Meta, Story, Playground, Header, Props } from '@docs/components'
import { QBadge, QButton } from '@quarbon/ui'

Meta.set({
  name: 'Components/Badge',
  custom() {
    return (
      <Page component={QBadge}>
        <Header />
        <Props />
        <Playground
          custom={(props: any) => {
            return (
              <QButton color="secondary" style={{ margin: 20 }}>
                My Button
                <QBadge {...props} />
              </QButton>
            )
          }}
        />
        <Story
          id="QBadgeStandard"
          label="Standard"
          source={() => (
            // @doc:story QBadgeStandard
            <QButton>
              <span>My Button</span>
              <QBadge label="2" />
            </QButton>
            // @doc:story:end
          )}
        />
      </Page>
    )
  },
})
