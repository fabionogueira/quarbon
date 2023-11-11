import { Meta, TProps, Page, Story, Header, Props } from '@docs/components'
import { QSelect, QSelectItem } from '@quarbon/ui'
import { Playground } from '@docs/components/Playground'

// @doc:story QSelectBasicStory
const options = [
  { label: 'option 001', value: '1' },
  { label: 'option 002', value: '2' },
  { label: 'option 003', value: '3' },
  { label: 'option 004', value: '4' },
]
// @doc:story:end

Meta.set({
  name: 'Components/Select',
  custom: SelectDocs,
})

function SelectDocs() {
  return (
    <Page component={QSelect} className="docs-toggle">
      <Header />
      <Props />
      <Props component={QSelectItem} />
      <Playground
        custom={(props: any) => {
          return <QSelect {...props} options={options} />
        }}
      />
      <Story id="QSelectBasicStory" label="Basic" source={QSelectBasicStory} />
    </Page>
  )
}

/**
 * @doc:story
 */
function QSelectBasicStory() {
  return <QSelect options={options} />
}
