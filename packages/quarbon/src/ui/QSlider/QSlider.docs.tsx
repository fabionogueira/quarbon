import { Header, Meta, Page, Props, Story } from '@docs/components'
import { Playground } from '@docs/components/Playground'
import { QSlider } from '@quarbon/ui'

Meta.set({
  name: 'Components/Slider',
  custom() {
    return (
      <Page component={QSlider} className="docs-toggle">
        <Header />
        <Props />
        <Playground />
        <Story id="QSliderBasicStory" label="Basic" source={QSliderBasicStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function QSliderBasicStory() {
  return <QSlider label="Range 500-1000" max={1000} min={500} />
}
