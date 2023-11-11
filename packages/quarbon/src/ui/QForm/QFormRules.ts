import { Lang } from "@quarbon/plugins/Lang"
import { langGroupName, TLang } from "@quarbon/langdef"

const translate = Lang.get<TLang>(langGroupName)

export class Rules {
  private _arr: TRuleCallback[] = []
  private _value: any = undefined

  protected createRule(fn: TRuleCallback) {
    this._arr.push(fn)
    return this
  }

  $validate(value: any) {
    let message: string | boolean

    for (let i = 0; i < this._arr.length; i++) {
      message = this._arr[i](value)
      if (message !== true) return message
    }

    return true
  }

  $value() {
    return this._value
  }

  value(val: any) {
    this._value = val
    return this
  }

  required(message?: string) {
    this._arr.push((val: any) => {
      return !!val || message || translate.required
    })

    return this
  }

  notNull(message?: string) {
    this._arr.push((val: any) => val === null || message || translate.notNull)
    return this
  }

  notIsFalse(message?: string) {
    this._arr.push((val: any) => val === true || message || translate.notIsFalse)
    return this
  }

  toggle(message?: string) {
    //TODO
    this._arr.push((val: any) => val !== null || message || translate.toggle)
    return this
  }

  min(value: number, message?: string) {
    this._arr.push((val: any) =>
      val ? val.length >= value || message || $string(translate.min, { value }) : true
    )
    return this
  }

  max(value: number, message?: string) {
    this._arr.push((val: any) =>
      val ? val.length <= value || message || $string(translate.max, { value }) : true
    )
    return this
  }

  size(value: number, message?: string) {
    this._arr.push((val: any) =>
      val ? val.length == value || message || $string(translate.size, { value }) : true
    )
    return this
  }

  exists(value: string, message?: string) {
    this._arr.push((val: any) =>
      val ? value.includes(val) || message || $string(translate.exists, { val }) : true
    )
    return this
  }

  date(message?: string) {
    this._arr.push((val: any) =>
      val ? /^-?\d+\/[0-1]\d\/[0-3]\d$/.test(val) || message || translate.date : true
    )
    return this
  }

  time(message?: string) {
    this._arr.push((val: any) =>
      val ? /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(val) || message || translate.time : true
    )
    return this
  }

  email(message?: string) {
    this._arr.push((val: any) => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || message || translate.email
    })

    return this
  }

  cnpj(message?: string) {
    this._arr.push((val: any) => {
      const cnpjPattern = /^\d{2}\d{3}\d{3}\d{4}\d{2}$/
      return cnpjPattern.test(val) || message || translate.cnpj
    })
    return this
  }

  password(message?: string) {
    this._arr.push((val: string) => {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      return passwordPattern.test(val) || message || translate.password
    })

    return this
  }

  url(message?: string) {
    this._arr.push((val: string) => {
      const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + // validate protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ) // validate fragment locator
      return urlPattern.test(val) || message || translate.url
    })

    return this
  }

  custom(fn: TRuleCallback) {
    this._arr.push(fn)
    return this
  }
}

export function rules() {
  return new Rules()
}

export function validate(value: any, rules: any) {
  if (!rules || (rules && !rules._arr)) {
    return true
  }

  const arr = rules._arr
  let i, validation, fn

  for (i = 0; i < arr.length; i++) {
    fn = arr[i]

    if (typeof fn != "function") continue

    validation = fn(value)

    if (validation !== true) {
      return validation
    }
  }

  return true
}

function $string(str: string, data: any) {
  Object.entries(data).forEach(([key, value]: any) => {
    str = str.replace(`{{${key}}}`, value)
  })

  return str
}

export type TRuleCallback = (value: any) => string | true
