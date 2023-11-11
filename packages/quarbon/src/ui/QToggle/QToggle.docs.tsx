import { useState } from 'react'
import { Meta, Page, Story, Header, Playground, Props } from '@docs/components'
import { QField, QToggle } from '@quarbon/ui'

Meta.set({
  name: 'Components/Toggle',
  custom() {
    return (
      <Page component={QToggle} className="docs-toggle">
        <Header />
        <Props />
        <Playground />
        <Story id="QToggleBasicStory" label="Basic" source={QToggleBasicStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function QToggleBasicStory() {
  const [checked, setChecked] = useState(false)

  return (
    <QField label="Toggle" borderless after={checked ? '1' : '0'}>
      <QToggle checked={checked} onChange={(value: boolean) => setChecked(value)} />
    </QField>
  )
}
