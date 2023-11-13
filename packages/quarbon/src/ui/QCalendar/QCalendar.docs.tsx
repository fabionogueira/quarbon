import { Meta, Page, Story, Header, Props } from '@docs/components'
import { QCalendar } from '@quarbon/ui'
import { Playground } from '@docs/components/Playground'
import { useState } from 'react'

Meta.set({
  name: 'Components/Calendar',
  custom() {
    return (
      <Page component={QCalendar} className="docs-calendar">
        <Header />
        <Props />
        <Playground />
        <Story id="QCalendarBasicStory" label="Basic" source={QCalendarBasicStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function QCalendarBasicStory() {
  const [date, setDate] = useState<any>(null)

  return (
    <div className="vbox v-align--center" style={{width:"100%"}}>
      <pre>{date}</pre>
      <QCalendar value={date} onSelectDate={setDate} />
    </div>
  )
}
