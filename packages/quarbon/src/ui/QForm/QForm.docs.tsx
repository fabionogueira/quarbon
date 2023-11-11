import { Header, Meta, Page, Props, Story } from '@docs/components'
import { QButton, QCheckbox, QForm, QTextbox } from '@quarbon/ui'

// @doc:story QFormInlineRulesStory, QFormUseFormDataRulesStory, QFormWithNativeInputStory, QFormCustomValidatorStory
import { useFormData } from '@quarbon/hooks'
import { rules } from '@quarbon/ui/QForm/QFormRules'
// @doc:story:end

// @doc:story QFormSubmitValidationStory
import { Dialog } from '@quarbon/plugins/Dialog'
// @doc:story:end

Meta.set({
  name: 'Components/Form',
  custom() {
    return (
      <Page className="docs-qform" component={QButton}>
        <Header description="QButton description" />
        <Props />
        <Story id="QFormInlineRulesStory" label="Inline rules" source={QFormInlineRulesStory} />
        <Story id="QFormUseFormDataRulesStory" label="With useFormData validations" source={QFormUseFormDataRulesStory} />
        <Story id="QFormWithNativeInputStory" label="With native input" source={QFormWithNativeInputStory} />
        <Story id="QFormCustomValidatorStory" label="Custom validator" source={QFormCustomValidatorStory} />
        <Story id="QFormSubmitValidationStory" label="Submit validation" source={QFormSubmitValidationStory} />
      </Page>
    )
  },
})

/**
 * @doc:story
 */
function QFormInlineRulesStory() {
  const form = useFormData({
    name: 'val',
    email: '',
  })

  return (
    <QForm formData={form}>
      <div className="text-caption">name={form.name}</div>
      <br />
      <QTextbox name="name" value={form.name} rules={rules().max(3)} helperText="Max 3 characters" />
      <br />
      <QTextbox name="email" value={form.email} rules={rules().email()} helperText="Max 3 characters" />
    </QForm>
  )
}

/**
 * @doc:story
 */
function QFormUseFormDataRulesStory() {
  const form = useFormData({
    name: rules().max(3),
    email: rules().email(),
  })

  return (
    <QForm formData={form}>
      <div className="text-caption">name={form.name}</div>
      <div className="text-caption">email={form.email}</div>
      <br />
      <QTextbox name="name" value={form.name} helperText="Max 3 characters" />
      <br />
      <QTextbox name="email" value={form.email} helperText="Seu email" />
    </QForm>
  )
}

/**
 * @doc:story
 */
function QFormWithNativeInputStory() {
  const form = useFormData({
    name: rules().max(3),
  })

  return (
    <QForm>
      <div className="text-caption">name={form.name}</div>
      <br />
      <input
        type="text"
        value={form.name || ''}
        className="native-input"
        onChange={(evt) => form.setValue('name', evt.target.value)}
      />
      <div className="text-overline text-negative">{form.getError('name')}</div>
    </QForm>
  )
}

/**
 * @doc:story
 */
function QFormCustomValidatorStory() {
  const form = useFormData({
    myValue: rules().required().custom(myCustomValidation),
  })

  function myCustomValidation(value: number) {
    if (!value) return true

    return value > 10 && value < 20 ? true : 'Please, enter a value between 10 and 20!'
  }

  return (
    <QForm formData={form}>
      <div className="text-caption">value={form.myValue}</div>
      <br />
      <QTextbox
        type="number"
        name="myValue"
        value={form.myValue}
        helperText={form.isValidate('myValue') ? 'The value is correct' : 'A value between 10 and 20'}
      />
    </QForm>
  )
}

/**
 * @doc:story
 */
function QFormSubmitValidationStory() {
  const form = useFormData({
    email: rules().required().email().value('test'),
    accept: false,
  })

  function onSubmit(data: any) {
    if (!data.accept) {
      Dialog.notifyError('You need to accept the license and terms first')
    } else {
      Dialog.notifySuccess('Submitted')
    }
  }

  return (
    <QForm formData={form} onSubmit={onSubmit}>
      <QTextbox label="Your email*" name="email" value={form.email} />
      <br />
      <QCheckbox label="I accept the license and terms" name="accept" checked={form.accept} />
      <div style={{ marginTop: 20 }}>
        <QButton label="Submit" type="submit" color="primary" />
        <QButton label="Reset" type="reset" color="secondary" style={{ marginLeft: 20 }} />
      </div>
    </QForm>
  )
}
