import { Meta, Page, Header, Props, Playground, Story } from '@docs/components'
import { QProgress } from '@quarbon/ui'

Meta.set({
  name: 'Components/Progress',
  custom() {
    return (
      <Page component={QProgress} className="docs-qprogress">
        <Header />
        <Props />
        <Playground
          custom={(props: any) => {
            return <QProgress {...props} style={{ width: '100%' }} />
          }}
        />
        <Story
          id="QProgressBasicStory"
          label="Basic"
          source={() => {
            return (
              // @doc:story QProgressBasicStory
              <QProgress value={50} indeterminate style={{ width: '100%' }} />
              // @doc:story:end
            )
          }}
        />
      </Page>
    )
  },
})
