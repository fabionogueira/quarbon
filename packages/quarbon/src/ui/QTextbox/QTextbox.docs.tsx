import { Meta, Page, Header, Props, Playground, Story } from '@docs/components'
import { QTextbox } from '@quarbon/ui'
import { CbCalendar, CbSend } from '@quarbon/icons/cb'

Meta.set({
  name: 'Components/Textbox',
  custom() {
    return (
      <Page component={QTextbox} className="docs-qtextbox">
        <Header />
        <Props />
        <Playground />
        <Story id="QTextboxBasicStory" label="Basic Textbox" source={QTextboxBasicStory} />
        <Story id="QTextboxWithIconsStory" label="With icons" source={QTextboxWithIconsStory} />
        <Story id="QTextboxInputTypesStory" label="Input types" source={QTextboxInputTypesStory} />
        <Story id="QTextboxPrefixSuffixStory" label="Prefix and Suffix" source={QTextboxPrefixSuffixStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function QTextboxBasicStory() {
  return (
    <>
      <div className="q-gap-16">
        <QTextbox name="textbox" label="Standard" />
        <QTextbox name="textbox" label="Filled" filled />
        <QTextbox name="textbox" label="Outlined" outlined />
      </div>
    </>
  )
}

/**
 * @doc:story
 */
function QTextboxWithIconsStory() {
  return (
    <>
      <div className="q-gap-16">
        <QTextbox
          name="textbox"
          outlined
          label="Before icons"
          placeholder="Your text here"
          before={<CbCalendar size={32} />}
        />
        <QTextbox
          name="textbox"
          outlined
          label="Prepend icons"
          placeholder="Your text here"
          prepend={<CbCalendar size={32} />}
        />
        <QTextbox
          name="textbox"
          outlined
          label="After icon"
          placeholder="Your text here"
          after={<CbSend size={32} />}
        />
        <QTextbox
          name="textbox"
          outlined
          label="Append icon"
          placeholder="Your text here"
          append={<CbSend size={32} />}
        />
      </div>
    </>
  )
}

/**
 * @doc:story
 */
function QTextboxInputTypesStory() {
  return (
    <>
      <div className="q-gap-16">
        <QTextbox name="textbox" label="Type number" type="number" />
        <QTextbox name="textbox" label="Type date" type="date" />
        <QTextbox name="textbox" label="Type password" type="password" />
        <QTextbox name="textbox" style={{ height: 112 }} label="Type textarea" type="textarea" />
      </div>
    </>
  )
}

/**
 * @doc:story
 */
function QTextboxPrefixSuffixStory() {
  return (
    <>
      <div className="q-gap-16">
        <QTextbox name="textbox" label="With prefix" type="number" prefix="$" />
        <QTextbox name="textbox" label="With suffix" suffix="@example.com" />
      </div>
    </>
  )
}
