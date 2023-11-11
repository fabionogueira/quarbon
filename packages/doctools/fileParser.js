// @ts-check

import fs from 'fs'

export function fileParser(file, allComponents = {}, allStoryCodes = {}, allDocs = {}) {
  const content = getContent(file.fullPath)
  const lines = content.split('\n')
  const lineIndexLast = lines.length - 1
  //const fileStartWith = file.name.split(".")[0];
  const jsdoc = {
    story() {
      const param = activeLine.param ?? 'name'
      const value = (param === 'name' ? activeLine.value ?? findComponentName() : activeLine.value)?.trim()

      if (param === 'name') {
        const code = findStoryContent()
        value.split(',').forEach((v) => {
          v = v.trim()
          const story = allStoryCodes[v] ?? { id: v, source: '', file: file.fullPath }
          story.source += (story.source ? '\n\n' : '') + code
          allStoryCodes[v] = story
        })
      } else if (param === 'end') {
        activeStory = null
      }
    },
    code() {
      // const code = []
      // const id = activeLine.value
      //
      // while (nextLine()) {
      //   if (activeLine.tag) break
      //   code.push(activeLine.line)
      // }
      //
      // if (id) {
      //   allStoryCodes[id] = getFormatted(code) + '\n'
      // }
    },
    name() {
      activeComponent.name = activeLine.value
    },
    className() {
      activeComponent.className = activeLine.value
    },
    component() {
      let value = activeLine.value ?? findComponentName()

      if (!value) {
        exception(`[@doc:${activeLine.tag}], component name not found.\nFile: ${file.fullPath}:${activeLine.index}`)
      }

      activeComponent = allComponents[value] ?? { file: file.fullPath }
      activeComponent.component = value
      allComponents[value] = activeComponent
    },
    description() {
      activeComponent.description = activeLine.value
    },
    attrs() {
      return true
    },
    attr() {
      const attr = {}

      do {
        if (activeLine.line === '*/') break
        if (!activeLine.param) {
          // @doc:attr
          const a = findAttr()
          if (a) {
            attr['name'] = a.name
            if (!attr['type']) attr['type'] = a.type
            break
          }
          exception(`[@doc:${activeLine.tag}], unexpected erro.\nFile: ${file.fullPath}:${activeLine.index}`)
        } else {
          if (!activeLine.value) {
            exception(
              `[@doc:${activeLine.tag}:${activeLine.param}], value is required.\nFile: ${file.fullPath}:${activeLine.index}`,
            )
          }
          attr[activeLine.param] = activeLine.value
        }
      } while (nextLine())

      if (!attr.name) {
        lineIndex--
        const a = findAttr()
        if (a) {
          attr['name'] = a.name
          if (!attr['type']) attr['type'] = a.type
        }
      }

      if (attr.name) {
        if (attr.type === 'boolean') {
          attr.default = attr.default === undefined ? attr.default : JSON.parse(attr.default)
        }
        if (attr.type === 'number') {
          attr.default = attr.default === undefined ? attr.default : Number(attr.default)
        }
        if (attr.control === 'false') {
          attr.control = false
        }

        activeComponent.attrs = activeComponent.attrs ?? {}
        activeComponent.attrs[attr.name] = attr
      }
    },
    control() {
      return true
    },
    memberof() {
      return true
    },
  }

  let lineIndex = 0
  let activeLine = null
  let activeStory = null
  let activeComponent = null

  if (file.name.includes('.docs.')) {
    allDocs[file.name] = file.fullPath
  }

  while (nextLine()) {
    if (activeLine.tag) {
      const jsdocElement = jsdoc[activeLine.tag]

      if (!jsdocElement) {
        exception(`[@doc:${activeLine.tag}] not implemented.\nFile: ${file.fullPath}:${activeLine.index}`)
      }
      if (!'component story'.includes(activeLine.tag) && !activeComponent) {
        exception(`[@doc:${activeLine.tag}] define before component.\nFile: ${file.fullPath}:${activeLine.index}`)
      }

      jsdocElement()
    }
  }

  function nextLine() {
    if (lineIndex > lineIndexLast) {
      activeLine = null
      return false
    }

    let line = lines[lineIndex].trim()

    lineIndex++

    if (!line.includes('@doc:')) {
      activeLine = { line, raw: lines[lineIndex - 1] }
      return true
    }

    if (line.startsWith('{')) {
      line = line.replace('*/', '').slice(0, -1)
    }
    const a1 = line.split('@doc:')[1].split(/(?<=^\S+)\s/)
    const tag = a1[0].split(':').shift()
    const value = a1[1]?.startsWith('{') || a1[1]?.startsWith('[') ? JSON.parse(a1[1]) : a1[1]

    activeLine = {
      index: lineIndex,
      tag,
      value,
      param: a1[0]?.split(':')[1],
      line,
      raw: lines[lineIndex - 1],
    }

    return true
  }
  function findComponentName() {
    //const QButtonStory=
    //function QButtonStory(
    //export [default] const QButtonStory=
    //export [default] function QButtonStory(

    const index = lineIndex
    const line = activeLine
    let value = null

    while (nextLine()) {
      if (activeLine.line.startsWith('*/')) {
        nextLine()
        const arr = activeLine.line
          .split(' ')
          .filter((s) => s.trim())
          .filter((s) => !'export default const function'.includes(s))

        value = arr[0]?.split("(")[0].replace(/[(|)=]/g, '')
        break
      }
    }

    lineIndex = index
    activeLine = line

    return value
  }
  function findStoryContent() {
    let arr = []
    let last = null

    if (activeLine.line.startsWith('*')) {
      while (nextLine()) if (activeLine.line.startsWith('*/')) break
    }

    while (nextLine()) {
      if (activeLine.tag === 'story') {
        if (activeLine.line.startsWith('*')) {
          for (let i = arr.length - 1; i >= 0; i--) {
            const l = arr[i]
            arr.pop()
            if (l.startsWith('/*')) break
          }
        }
        break
      }

      if (!last && !activeLine.line) continue

      last = activeLine.line
      arr.push(activeLine.raw)
    }

    lineIndex = lineIndex - 1
    return getFormatted(arr) //.join('\n')
  }
  function findAttr() {
    //attribute?: type

    const index = lineIndex
    const line = activeLine
    let value = null

    while (nextLine()) {
      if (activeLine.line.startsWith('*/')) {
        nextLine()
        const arr = activeLine.line.split(':')
        value = {
          name: arr[0]?.replace('?', '').trim(),
          type: arr[1]?.trim() ?? '',
        }
        break
      }
    }

    lineIndex = index
    activeLine = line

    return value
  }
}
function getContent(file) {
  return String(fs.readFileSync(file))
}
function getFormatted(code) {
  if (code[0]) {
    let spacesCount = code[0].search(/\S/)
    code = code.map((s) => s.substring(spacesCount))
    return code.join('\n')
  }

  return ''
}
function exception(value) {
  console.error(`\nError: ${value}\n`)
  process.exit(1)
}
