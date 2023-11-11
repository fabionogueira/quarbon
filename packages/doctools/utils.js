import fs from "fs";
import path from "path";

export function getFiles(dirPath, arrayOfFiles) {
    arrayOfFiles = arrayOfFiles || []

    if (dirPath.includes('node_modules')) return arrayOfFiles

    let files = fs.readdirSync(dirPath)
    files.forEach(function (file) {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getFiles(dirPath + '/' + file, arrayOfFiles)
        } else {
            if (file.endsWith('.tsx'))
                arrayOfFiles.push({
                    fullPath: path.join(dirPath, '/', file),
                    name: file,
                })
        }
    })

    return arrayOfFiles
}

export function createFile(file, content) {
    fs.writeFileSync(file, content, { encoding: 'utf8', flag: 'w' })
}