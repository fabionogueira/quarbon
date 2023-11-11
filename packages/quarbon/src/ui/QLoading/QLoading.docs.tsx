import { useEffect, useState } from 'react'
import { Meta, Page, Header, Props, Playground, Story } from '@docs/components'
import { QLoading } from '@quarbon/ui'

Meta.set({
  name: 'Components/Loading',
  custom() {
    return (
      <Page component={QLoading} className="docs-qloading">
        <Header />
        <Props />
        <Playground custom={QLoadingPlayground} />
        <Story id="QLoadingBasicStory" label="Basic" source={QLoadingBasicStory} />
        <Story id="QLoadingLabelPositionStory" label="Label position" source={QLoadingLabelPositionStory} />
        <Story id="QLoadingSizeStory" label="Sizes" source={QLoadingSizeStory} />
      </Page>
    )
  },
})

function QLoadingPlayground(props: any) {
  const [inline, setInline] = useState(props.inline)

  useEffect(() => {
    setInline(props.inline)

    if (!props.inline) {
      setTimeout(() => {
        setInline(true)
      }, 4000)
    }
  }, [props.inline])

  return <QLoading {...props} inline={inline} />
}

/**
 * @doc:story
 */
function QLoadingBasicStory() {
  return (
    <>
      <QLoading color="primary" />
      <QLoading color="accent" />
      <QLoading color="warning" />
      <QLoading color="info" />
      <QLoading color="positive" />
      <QLoading color="negative" />
    </>
  )
}

/**
 * @doc:story
 */
function QLoadingLabelPositionStory() {
  return (
    <>
      <QLoading color="primary" label="Default" />
      <QLoading color="secondary" label="Bottom position" labelPosition="bottom" />
      <QLoading color="accent" label="Top position" labelPosition="top" />
      <QLoading color="warning" label="Right position" labelPosition="right" />
    </>
  )
}

/**
 * @doc:story
 */
function QLoadingSizeStory() {
  return (
    <>
      <QLoading color="primary" size={42} labelPosition="top" label="42" />
      <QLoading color="primary" size={62} labelPosition="top" label="62" />
      <QLoading color="primary" size={92} labelPosition="top" label="92" />
      <QLoading color="primary" size={120} labelPosition="top" label="120" />
    </>
  )
}
