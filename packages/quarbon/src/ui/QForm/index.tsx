import { FormEvent, forwardRef } from 'react'
import { TBaseProps } from '@quarbon/types'
import { QFormContext, TFormContext, TFormData } from './QFormContext'

/**
 * @doc:component
 */
export const QForm = forwardRef<HTMLFormElement, TQFormProps>((props, ref) => {
  const { children, className, style, rules, formData, onSubmit, onReset } = props

  let ctx: TFormContext | undefined = undefined

  if (formData) {
    ctx = (formData as any)?.$context
    ;(formData as any).$QFormRules = rules
  }

  function onSubmitLocal(event: FormEvent) {
    event.preventDefault()

    if (!ctx) {
      return
    }

    const data = ctx.getData()
    const arr = Object.keys(data)
    let errorExists = false

    for (let i = 0; i < arr.length; i++) {
      const key = arr[i]
      const validate = ctx.setValue(key, data[key])

      if (typeof validate == 'string') {
        if (ctx.setSubmitError(key, validate)) {
          errorExists = true
          break
        }
      }
    }

    if (!errorExists && onSubmit) onSubmit(data, event)
  }

  function onResetLocal(event: FormEvent) {
    ctx?.reset()
    onReset && onReset(event)
  }

  return (
    <QFormContext.Provider value={ctx}>
      <form
        data-container
        ref={ref}
        className={className}
        style={style}
        onSubmit={onSubmitLocal}
        onReset={onResetLocal}
      >
        {children}
      </form>
    </QFormContext.Provider>
  )
})
QForm.displayName = 'QForm'
type TFunctionSubmit = (form: Record<string, any>, event?: FormEvent) => void
type TFunctionReset = (event?: FormEvent) => void
type TQFormProps = TBaseProps & {
  /**
   * @doc:attr
   */
  forceSubmit?: boolean

  /**
   * @doc:attr
   */
  formData?: TFormData // & TInitialData & { $context: TFormContext};

  /**
   * @doc:attr:type event
   */
  onChange?: () => void

  /**
   * @doc:attr
   */
  onSubmit?: TFunctionSubmit

  /**
   * @doc:attr:type event
   */
  onReset?: TFunctionReset

  /**
   * @doc:attr
   */
  rules?: any
}
