import { Header, Meta, Page, Playground, Props } from '@docs/components'
import { QInlineNotify } from '@quarbon/ui'

Meta.set({
  name: 'Components/InlineNotify',
  custom() {
    return (
      <Page component={QInlineNotify} className="docs-qbutton">
        <Header />
        <Props />
        <Playground />
        {/*<Story id="" label="" source={} />*/}
      </Page>
    )
  },
})
