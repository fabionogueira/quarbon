/** @format */

import { createContext, useState } from "react"
import { Rules } from "@quarbon/ui/QForm/QFormRules"
import { hasOwner } from "@quarbon/utils/datatype"

type TGetData = () => Record<string, any>
type TGetError = (field: string) => any
type TSetValue = (field: string, value: any, rules?: any) => string | null | true
type TOnSubmitComponentCallback = (error?: string) => void

export type TInitialData = Record<string, string | number | boolean | Array<any> | Rules>
export type TFormData = {
  setValue: TSetValue
  getError: TGetError
  getData: TGetData
  isValidate: (field: string) => boolean
  reset: () => void
}
export type TFormContext = {
  getData: TGetData
  getError: TGetError
  isValidate: (field: string) => boolean
  reset: () => void
  setValue: TSetValue
  setSubmitError: (name: string, error: string) => boolean
  onSubmitError: (name: string, callback: TOnSubmitComponentCallback | null) => void
}

export const QFormContext = createContext<TFormContext | undefined>({
  getData: () => ({}),
  /* eslint-disable @typescript-eslint/no-unused-vars */
  getError: (_field: string) => null,
  isValidate: (_field: string) => false,
  reset: () => void 0,
  setValue: (_field: string, _value: any, _rules?: any) => null,
  setSubmitError: (_name: string, _error: string) => false,
  onSubmitError: (_name: string, _callback: TOnSubmitComponentCallback | null) => void 0,
  /* eslint-enable @typescript-eslint/no-unused-vars */
})

export function useFormData<T>(initialData: T | TInitialData): Record<string, any> & TFormData {
  const oo: any = {}
  const useFormRules: any = {}

  Object.keys(initialData as any).forEach((key) => {
    let value = (initialData as any)[key]

    if (value instanceof Rules) {
      useFormRules[key] = value
      value = value.$value()
    }

    oo[key] = value
  })

  const [formData, setData] = useState(oo)
  const onSubmitListeners: Record<string, TOnSubmitComponentCallback> = {}
  const context: TFormContext = {
    getData() {
      return Object.keys(formData).reduce((obj: any, key) => {
        if (hasOwner(initialData as any, key)) {
          obj[key] = formData[key]
        }

        return obj
      }, {})
    },
    getError(field: string) {
      return formData[`${field}$error`]
    },
    isValidate(field: string) {
      return formData[`${field}$error`] === false
    },
    reset() {
      setData(oo)
    },
    setValue(field: string, value: any, inlineRules?: any) {
      const rules = inlineRules ?? useFormRules[field] ?? formData.$QFormRules?.[field]
      const validation = rules?.$validate(value) ?? null

      setData({
        ...formData,
        [field]: value,
        [`${field}$error`]: validation === true ? false : validation,
      })

      return validation
    },
    setSubmitError(field: string, error: string) {
      const fn = onSubmitListeners[field]

      if (fn) {
        setData({
          ...formData,
          [`${field}$error`]: error,
        })
        fn()
        return true
      }

      return false
    },
    onSubmitError(name: string, callback: TOnSubmitComponentCallback | null) {
      if (!callback) {
        delete onSubmitListeners[name]
      } else {
        onSubmitListeners[name] = callback
      }
    },
  }

  formData.setValue = context.setValue
  formData.getError = context.getError
  formData.getData = context.getData
  formData.isValidate = context.isValidate
  formData.reset = context.reset
  formData.$context = context

  return formData
}
