import { Meta, Page, Header, Props, Playground, Story } from '@docs/components'
import { QRadio } from '@quarbon/ui'
// @doc:story QRadioButtonCustomIconsStory
import { CbCheckmarkFilled } from '@quarbon/icons/cb'
// @doc:story:end

Meta.set({
  name: 'Components/RadioButton',
  custom() {
    return (
      <Page component={QRadio} className="docs-qradio">
        <Header />
        <Props />
        <Playground />
        <Story id="QRadioButtonBasicStory" label="Basic" source={QRadioButtonBasicStory} />
        <Story id="QRadioButtonCustomIconsStory" label="Custom Icons" source={QRadioButtonCustomIconsStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function QRadioButtonBasicStory() {
  return (
    <>
      <QRadio value="1" name="agree" />
      <QRadio value="2" name="agree" />
      <QRadio value="3" name="agree" />
    </>
  )
}

/**
 * @doc:story
 */
function QRadioButtonCustomIconsStory() {
  return (
    <>
      <QRadio checkedIcon={CbCheckmarkFilled} label="Line" value="Line" name="form" />
      <QRadio checkedIcon={CbCheckmarkFilled} label="Rectangle" value="Rectangle" name="form" />
      <QRadio checkedIcon={CbCheckmarkFilled} label="Ellipse" value="Ellipse" name="form" />
    </>
  )
}
