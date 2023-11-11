const TextFormat = {
  format(definition:any, value:string){
    let i, k

    for (i in TextFormat.transformers){
      k = definition[i]
      if (k){
        return (TextFormat.transformers as any)[i](k, value)
      }
    }

    return value
  },

  transformers: {
    'text.transform'(value:"uppercase" | "lowercase", data: string){
      data = data || ''

      switch (value){
        case 'uppercase':
          data = data.toLocaleUpperCase()
          break

        case 'lowercase':
          data = data.toLocaleLowerCase()
          break
      }

      return data
    }
  }
}

const NumberFormat = function (def:any, value: number){
  let num = parseInt(String(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${def.thousand}`)
  let rest = value.toFixed(def.precision).split('.')[1] || ''

  return num + (rest ? def.decimal : '') + rest
}

export const DataFormat = {
  Text: TextFormat,
  Number: NumberFormat
}