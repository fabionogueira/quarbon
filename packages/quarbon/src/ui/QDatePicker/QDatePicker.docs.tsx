import { Meta, Page, Story, Header } from '@docs/components'
import { QDatePicker } from '@quarbon/ui'
import { Playground } from '@docs/components/Playground'
import {useState} from "react";

Meta.set({
  name: 'Components/DatePicker',
  custom: DatePickerDocs,
})

function DatePickerDocs() {
  return (
    <Page component={QDatePicker} className="docs-datepicker">
      <Header />
      <Playground />
      <Story id="QDatePickerBasicStory" label="Basic" source={QDatePickerBasicStory} />
    </Page>
  )
}

/**
 * @doc:story
 */
function QDatePickerBasicStory() {
  const [date, setDate] = useState("")

  return (
    <div>
      <pre>{date}</pre>
      <QDatePicker label="Simple date" onChange={setDate} />
    </div>
  )
}
