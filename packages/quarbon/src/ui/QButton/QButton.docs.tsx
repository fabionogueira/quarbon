import {Meta, Page, Props, Story, Header, Playground} from '@docs/components'
import { QButton } from '@quarbon/ui'
// @doc:story QButtonWithIconStory, QButtonOnlyIconStory
import { CbEmail, CbPhoneFilled, CbSend } from '@quarbon/icons/cb'
import { MdMarkEmailRead } from 'react-icons/all'
// @doc:story:end
import { useEffect, useState } from 'react'

Meta.set({
  name: 'Components/Button',
  custom() {
    return (
      <Page className="docs-qbutton" component={QButton}>
        <Header description="QButton description" />
        <Props />
        <Playground />
        <Story id="QButtonStandardStory" label="Standard" source={QButtonStandardStory} />
        <Story id="QButtonCustomColorsStory" label="Custom colors" source={QButtonCustomColorsStory} />
        <Story id="QButtonWithIconStory" label="With icon" source={QButtonWithIconStory} />
        <Story id="QButtonOnlyIconStory" label="Only icon" source={QButtonOnlyIconStory} />
        <Story id="QButtonTruncateLabelStory" label="Trucate label" source={QButtonTruncateLabelStory} />
        <Story id="QButtonLoadingStory" label="Loading" source={QButtonLoadingStory} />
        <Story id="QButtonProgressStory" label="Progress" source={QButtonProgressStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function QButtonStandardStory() {
  return (
    <>
      <QButton label="Primary" color="primary" />
      <QButton label="Accent" color="accent" />
      <QButton label="Secondary" color="secondary" />
      <QButton label="Info" color="info" />
      <QButton label="Negative" color="negative" />
      <QButton label="Positive" color="positive" />
      <QButton label="Warning" color="warning" />
    </>
  )
}

/**
 * @doc:story
 */
function QButtonCustomColorsStory() {
  return (
    <>
      <QButton label="Fuchsia" style={{ background: '#FF0080', color: 'white' }} />
      <QButton flat style={{ color: '#FF0080' }} label="Fuchsia Flat" />
      <QButton outline style={{ color: 'goldenrod' }} label="Goldenrod" />
    </>
  )
}

/**
 * @doc:story
 */
function QButtonWithIconStory() {
  return (
    <>
      <QButton label="On left" icon={<MdMarkEmailRead size={16} />} color="primary" />
      <QButton label="On right" icon={<MdMarkEmailRead size={16} />} color="secondary" iconAlign="right" />
      <QButton style={{ background: '#FF0080', color: 'white' }}>
        <i>
          <CbEmail />
        </i>
        On left and right
        <i>
          <CbSend />
        </i>
      </QButton>
      <QButton style={{ background: '#9c27b0', color: 'white' }}>
        <div className="col align-center">
          <i style={{ marginLeft: 0 }}>
            <CbPhoneFilled />
          </i>
          Stacked
        </div>
      </QButton>
      <QButton color="info">
        <div className="col align-center">
          Stacked
          <i style={{ marginLeft: 0 }}>
            <CbPhoneFilled />
          </i>
        </div>
      </QButton>
    </>
  )
}

/**
 * @doc:story
 */
function QButtonOnlyIconStory() {
  return (
    <>
      <QButton tooltip="teste" icon={<CbEmail size={16} />} color="primary" />
      <QButton icon={<MdMarkEmailRead size={16} />} color="accent" outline />
      <QButton icon={<CbPhoneFilled size={16} />} color="secondary" flat />
    </>
  )
}

/**
 * @doc:story
 */
function QButtonTruncateLabelStory() {
  return (
    <>
      <QButton color="primary" style={{ width: 200 }}>
        <div className="ellipsis">This is some very long text that is expected to be truncated</div>
      </QButton>
    </>
  )
}

/**
 * @doc:story
 */
function QButtonLoadingStory() {
  const [loading, setLoading] = useState(false)

  function simulate() {
    setLoading(true)
    setTimeout(() => setLoading(false), 4000)
  }

  return <QButton color="accent" label="Loading button" loading={loading} style={{ width: 150 }} onClick={simulate} />
}

/**
 * @doc:story
 */
function QButtonProgressStory() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (progress > 0 && progress < 100) {
      let p = progress + Math.floor(Math.random() * 8 + 10)
      if (p > 100) p = 100
      setTimeout(() => setProgress(p), 700)
    } else {
      setTimeout(() => setProgress(0), 1000)
    }
  }, [progress])

  function simulate() {
    setProgress(1)
  }

  return (
    <QButton
      color="primary"
      label={`Progress [${progress}]`}
      progress={progress}
      style={{ width: 150 }}
      onClick={simulate}
    />
  )
}
