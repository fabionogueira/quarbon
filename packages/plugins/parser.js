import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.resolve("../");

transpile();

function codesGenerator(docFiles) {
    let allImports = [];
    let allCodes = {};

    docFiles.forEach(file => {
        let codes = tsxParser(file.fullPath);
        let path = file.fullPath.replace('.tsx', '');

        allCodes = {
            ...allCodes,
            ...codes
        }

        allImports.push(`import "${path.replace(/\\/g, '/')}";`);
    })

    return {
        "codes": "export const codes:any = " + JSON.stringify(allCodes, null, "  "),
        "imports": allImports.join("\n")
    }
}
function createFile(file, content) {
    fs.writeFile(file, content, { encoding:'utf8', flag:'w' }, ()=>{})
}
function getDocFiles(dirPath, arrayOfFiles) {
    arrayOfFiles = arrayOfFiles || []

    if (dirPath.includes("node_modules"))
        return arrayOfFiles;

    let files = fs.readdirSync(dirPath);
    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getDocFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            if (file.includes(".docs."))
                arrayOfFiles.push({
                    fullPath: path.join(dirPath, "/", file),
                    name: file
                })
        }
    })

    return arrayOfFiles
}
function tsxParser(file) {
    let lineIndex = 0
    let source = String(fs.readFileSync(file));
    let lines = source.split("\n")
    let codes = {}

    loop((l1) => {
        if (l1.startsWith("custom:")) {
            parseTsx();
        } else if (l1.startsWith("stories:")) {
            parseJson();
        } else if (l1.startsWith("// @code=")) {
            let id = l1.split("=")[1];
            parseCode(id);
        }
    })

    return codes;

    function parseTsx() {
        loop((l1) => {
            if (l1.startsWith('source={')) {
                if (!l1.startsWith('source={(')) {
                    return false;
                }
            }

            if (l1.startsWith("<Story")) {
                let code = [];
                let id = "";
                let next = true;

                loop((l2) => {
                    if (l2.startsWith("id")) {
                        let v = l2.split("=")[1];
                        id = v.trim().replace(/"/g, '');
                    } else if (next) {
                        return false;
                    }

                    next = false;

                    if (l2.startsWith('source={')) {
                        if (!l2.startsWith('source={(')) {
                            lineIndex--;
                            return false;
                        }
                    }

                    if (l2.startsWith("<Body>") || l2.startsWith("//@body")) {
                        loop((l3, l) => {
                            if (l3.startsWith("</Body>") || l3.startsWith("//@body")) return false;
                            code.push(l);
                        })
                        return false;
                    }

                })

                if (id && code[0]) {
                    let spacesCount = code[0].search(/\S/);
                    code = code.map(s => s.substring(spacesCount));
                    codes[id] = code.join("\n");
                }
            }
        })
    }

    function parseJson() {
        loop((l1) => {
            if (l1.startsWith("body:")) {
                return false;
            }

            if (l1.startsWith("id:")) {
                let v = l1.split(":")[1];
                let code = [];
                let id = v.trim().replace(/"/g, '').replace(/,/g, "");

                loop((l2) => {
                    if (l2.startsWith("body:")) {
                        let arr = l2.split(":");
                        if (!arr[1].trim().startsWith("(")) {
                            lineIndex--;
                            return false;
                        }
                    }

                    if (l2.startsWith("<Body>") || l2.startsWith("//@body")) {
                        loop((l3, l) => {
                            if (l3.startsWith("</Body>") || l3.startsWith("//@body")) return false;
                            code.push(l);
                        })
                        return false;
                    }
                })

                if (id && code[0]) {
                    let spacesCount = code[0].search(/\S/);
                    code = code.map(s => s.substring(spacesCount));
                    codes[id] = code.join("\n");
                }
            }
        })
    }

    function parseCode(id) {
        let code = [];

        loop((l1, l2) => {
            if (l1.startsWith("// @code")) {
                return false;
            } else {
                code.push(l2);
            }
        });

        if (id && code[0]) {
            let spacesCount = code[0].search(/\S/);
            code = code.map(s => s.substring(spacesCount));
            codes[id] = (codes[id] ?? "") + code.join("\n");
        }
    }

    function loop(fn) {
        let line, lineTrim

        while (lineIndex < lines.length) {
            lineIndex++;
            line = lines[lineIndex];
            if (line === undefined)
                break;

            lineTrim = line.trim();

            if (fn(lineTrim, line, lineIndex) === false)
                break;
        }
    }
}

export function transpile() {
    const docFiles = getDocFiles(dir);
    const data = codesGenerator(docFiles)
    const dir2 = path.resolve(`${__dirname}/../doctools/dynamics`);

    createFile(`${dir2}/imports.ts`, data.imports);
    createFile(`${dir2}/codes.ts`, data.codes);
}

export function getContent(file) {
    return String(fs.readFileSync(file));
}