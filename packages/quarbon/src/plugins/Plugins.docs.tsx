import { Page, Meta, Story, Header } from '@docs/components'
import { QButton, QField, QRadio } from '@quarbon/ui'
// @doc:story PluginsDialogBasicStore, PluginsDialogCustomContentsStore
import { Dialog } from '@quarbon/plugins/Dialog'
// @doc:story:end
import { useEffect, useRef, useState } from 'react'
import { QProgress } from '@quarbon/ui/QProgress'

Meta.set({
  name: 'Plugins',
  custom: PluginsDocs,
})

let option: string

export function PluginsDocs() {
  return (
    <Page className="docs-plugins">
      <Header title="Plugins" />

      <Story id="PluginsDialogBasicStore" label="Basic Dialogs" source={PluginsDialogBasicStore} />
      <Story id="PluginsDialogCustomContentsStore" label="Dialog Contents" source={PluginsDialogCustomContentsStore} />
    </Page>
  )
}

/**
 * @doc:story
 */
function PluginsDialogBasicStore() {
  function showLoading() {
    Dialog.loading.show()

    setTimeout(() => {
      Dialog.loading.hide()
    }, 4000)
  }

  return (
    <div className="docs-plugins__buttons">
      <QButton
        color="primary"
        label="Alert"
        onClick={() => {
          Dialog.alert('Alert')
        }}
      />
      <QButton
        color="warning"
        label="Confirm"
        onClick={() => {
          Dialog.confirm('Confirm', (button: any) => {
            if (button == 0) Dialog.notifyInfo('No')
            if (button == 1) Dialog.notifyInfo('Yes')
          })
        }}
      />
      <QButton color="secondary" label="Loading" onClick={showLoading} />
      <QButton
        color="info"
        label="Notify (success)"
        onClick={() => {
          Dialog.notifySuccess('success notification')
        }}
      />
      <QButton
        color="negative"
        label="Notify (error)"
        onClick={() => {
          Dialog.notifyError('warning notification')
        }}
      />
    </div>
  )
}

/**
 * @doc:story
 */
function PluginsDialogCustomContentsStore() {
  const closeRef = useRef<any>(() => undefined)

  function Progress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
      if (progress < 100) {
        setTimeout(() => setProgress(progress + 10), 300)
      }
    }, [progress])

    function close() {
      setTimeout(() => {
        closeRef.current()
        Dialog.notifyInfo('Process completed!')
      }, 600)
    }

    return (
      <QProgress
        value={progress}
        label={`${progress}%`}
        onChangeComplete={(percent) => {
          if (percent == 100) close()
        }}
      />
    )
  }

  return (
    <div className="docs-plugins__buttons">
      <QButton
        color="primary"
        label="Radio options"
        onClick={() => {
          Dialog.alert(
            {
              title: 'Options',
              content: (
                <>
                  <QField>
                    <QRadio name="options" value="01" label="Options 01" onChange={(val: string) => (option = val)} />
                  </QField>
                  <QField>
                    <QRadio name="options" value="02" label="Options 02" onChange={(val: string) => (option = val)} />
                  </QField>
                  <QField>
                    <QRadio name="options" value="03" label="Options 03" onChange={(val: string) => (option = val)} />
                  </QField>
                </>
              ),
            },
            () => Dialog.notifyInfo(`Option = [${option}]`),
          )
        }}
      />
      <QButton
        color="primary"
        label="Show progress"
        onClick={() => {
          closeRef.current = Dialog.alert({
            title: null,
            close: false,
            button: false,
            persistent: true,
            content: <Progress />,
          })
        }}
      />
    </div>
  )
}
