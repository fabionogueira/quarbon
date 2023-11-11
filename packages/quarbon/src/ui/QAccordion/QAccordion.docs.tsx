import { Header, Meta, Page, Props, Story } from '@docs/components'
import { Playground, TPlaygroundRender } from '@docs/components/Playground'
import { lorem1, lorem2, lorem3 } from '@docs/lorem'
import { QAccordion, QAccordionItem } from '@quarbon/ui'
// @doc:story AccordionCustomIconStore
import { CbLocationCurrent, CbPinFilled, CbPlayOutlineFilled } from '@quarbon/icons/cb'
// @doc:story:end
import './QAccordion.docs.scss'

Meta.set({
  name: 'Components/Accordion',
  custom() {
    return (
      <Page component={QAccordion} className="docs-accordion">
        <Header />
        <Props />
        <Props component={QAccordionItem} />
        <Playground custom={CustomPlayground} />
        <Story id="AccordionCustomIconStore" label="Custom Icon" source={AccordionCustomIconStore} />
        <Story id="AccordionCustomActiveItemStore" label="Custom Active Item" source={AccordionCustomActiveItemStore} />
      </Page>
    )
  },
})

function CustomPlayground(props: TPlaygroundRender) {
  return (
    <QAccordion active="2" style={{ width: '100%' }} {...props}>
      <QAccordionItem label="Title 1" name="1">
        {lorem2}
      </QAccordionItem>
      <QAccordionItem label="Title 2" name="2">
        {lorem3}
      </QAccordionItem>
      <QAccordionItem label="Title 3" name="3">
        {lorem1}
      </QAccordionItem>
    </QAccordion>
  )
}

/**
 * @doc:story
 */
function AccordionCustomIconStore() {
  return (
    <QAccordion active="1">
      <QAccordionItem label="Title 1" name="1" icon={<CbPlayOutlineFilled />}>
        {lorem2}
      </QAccordionItem>
      <QAccordionItem label="Disabled" name="2" icon={<CbLocationCurrent />} disabled>
        {lorem3}
      </QAccordionItem>
      <QAccordionItem label="Title 3" name="3" icon={<CbPinFilled />}>
        {lorem1}
      </QAccordionItem>
    </QAccordion>
  )
}

/**
 * @doc:story
 */
function AccordionCustomActiveItemStore() {
  /**
   *  // css class definition
   *  .custom-item {
   *      color: red
   *  }
   */

  return (
    <QAccordion active="1" activeClass="custom-item">
      <QAccordionItem label="Title 1" name="1">
        {lorem2}
      </QAccordionItem>
      <QAccordionItem label="Title 2" name="2">
        {lorem3}
      </QAccordionItem>
      <QAccordionItem label="Title 3" name="3">
        {lorem1}
      </QAccordionItem>
    </QAccordion>
  )
}
