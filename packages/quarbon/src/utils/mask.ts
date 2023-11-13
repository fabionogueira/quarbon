
export const MaskUtil = {
  getMasked(value: string, mask: string, fill = '_') {
    const chars = (value || '').replace(/\D/g, '').split('')
    return mask.split('').reduce((s, c) => {
      if (c == '#') c = chars.shift() ?? fill
      return s + c
    }, '')
  },
  getUnmasked(value: string, mask: string, fill = '_') {
    const separators = mask.split('').filter((c) => c != '#')
    return (value || '')
      .split('')
      .filter((c) => !separators.includes(c) && c != fill)
      .join('')
  },
  nextMaskedCharPosition(mask: string, position = 0): number {
    let char
    let index = position

    do {
      char = mask.charAt(index)
      if (char == '#') {
        if (!mask.substring(0, index).includes('#')) index++
        return index
      }
      index++
    } while (char)

    index = mask.length - 1
    do {
      char = mask.charAt(index)
      if (char == '#') return index + 1
      index--
    } while (char)

    return position
  },
  beforeMaskedCharPosition(mask: string, position = 0): number {
    const char1 = mask.charAt(position)
    if (char1 == '#') return position

    let char2
    let index = position

    do {
      char2 = mask.charAt(index - 1)
      if (char2 == '#') return index
      index--
    } while (char2)

    index = 0
    do {
      char2 = mask.charAt(index)
      if (char2 == '#') return index
      index++
    } while (char2)

    return position
  },
  getCaret(input: HTMLInputElement) {
    //document.activeElement
    return {
      start: input.selectionStart ?? 0,
      end: input.selectionEnd ?? 0,
    }
  },
  setCaret(input: HTMLInputElement, start: number) {
    input.focus()
    input.setSelectionRange(start, start)
  },
  selectText(input: HTMLInputElement, start: number, end = 999999999) {
    input.focus()
    input.setSelectionRange(start, end)
  },
}