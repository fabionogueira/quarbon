// @ts-check

import fs from 'fs'
import path from 'path'
import { fileParser } from './fileParser.js'
import { createFile, getFiles } from './utils.js'

if (!process.argv[2]) {
  console.error('The argument path not found, use compile.js path/to/folder')
  process.exit(1)
}

const folder = path.resolve(process.argv[2])
const folderDocs = `${folder}/.docs`

if (!fs.existsSync(folder)) {
  console.error(`The path '${folder}' not exists`)
  process.exit(1)
}

const allComponents = {}
const allStoryCodes = {}
const allDocs = {}
const files = getFiles(folder)
files.forEach((file) => {
  fileParser(file, allComponents, allStoryCodes, allDocs)
})

if (!fs.existsSync(folderDocs)) {
  fs.mkdirSync(folderDocs, { recursive: true })
}
createFile(
  `${folderDocs}/definition.ts`,
  'export const attrs = ' +
    JSON.stringify(allComponents) +
    '\nexport const codes = ' +
    JSON.stringify(allStoryCodes) +
    "\n\n" +
    Object.values(allDocs)
      .map((p) => `import "${p}";`)
      .join('\n'),
)
