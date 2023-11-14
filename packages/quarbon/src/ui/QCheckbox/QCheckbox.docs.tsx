import { Meta, Page, Header, Props, Playground, Story } from '@docs/components'
import { QCheckbox } from '@quarbon/ui'
// @doc:story QCheckboxCustomIconsStory
import { BsFillBagCheckFill, BsFillBagDashFill, BsFillBagFill } from 'react-icons/all'
// @doc:story:end

Meta.set({
  name: 'Components/Checkbox',
  custom() {
    return (
      <Page component={QCheckbox} className="docs-qcheckbox">
        <Header description="QButton description" />
        <Props />
        <Playground />
        <Story id="QCheckboxBasicStory" label="Basic" source={QCheckboxBasicStory} />
        <Story id="QCheckboxCustomIconsStory" label="Custom Icons" source={QCheckboxCustomIconsStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function QCheckboxBasicStory() {
  return (
    <div>
      <QCheckbox />
    </div>
  )
}

/**
 * @doc:story
 */
function QCheckboxCustomIconsStory() {
  return (
    <div>
      <QCheckbox
        checkedIcon={BsFillBagCheckFill}
        uncheckedIcon={BsFillBagFill}
        undeterminedIcon={BsFillBagDashFill}
        label="Bag status"
      />
    </div>
  )
}
