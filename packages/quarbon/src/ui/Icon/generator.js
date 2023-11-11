/**
 * generator.js
 * @description
 *      Gera os componentes react referente aos arquivos svg na pasta svg
 */

const path = require("path")
const fs = require('fs')

let template = fs.readFileSync(__dirname + "/template", 'utf8');
let root = path.resolve(__dirname + "../../../svg/")
let packages = fs.readdirSync(root).filter((file) => {
    return fs.statSync(root + '/' + file).isDirectory();
});

packages.forEach(folder => {
    let dir
    let br = ""
    let p = root + "/" + folder
    let files = []
    let data = "{\n"
    
    if (!folder) {
        return
    }

    fs.readdirSync(p).forEach((file) => {
        let c
        let n = file

        if (file.endsWith(".svg")) {
            if (n.startsWith(`${folder}-`)) {
                n = n.replace(`${folder}-`, "")
            }

            n = toClassName(folder, n)
            c = fs.readFileSync(`${root}/${folder}/${file}`).toString()
            data += (`${br}"${n}":"${c.replace(/"/g, '\\"')}"`)
            br = ",\n"

            files.push({
                name: n,
                path: p.replace(root + "/", "") + '/' + file
            })
        }
    });
    data += "\n}"

    dir = `${__dirname}/${folder}`
    if (fs.existsSync(dir)){
        fs.rmSync(dir, { recursive: true });
    }
    fs.mkdirSync(dir);

    files.forEach(o => {
        let file = `${dir}/${o.name}.tsx`
        let code = template
            .replace("$PATH$", o.path)
            .replace("$NAME$", o.name) 

        fs.writeFile(file, code, { encoding:'utf8', flag:'w' }, ()=>{})
    })

    fs.writeFile(`${dir}/_data.json`, data, { encoding:'utf8', flag:'w' }, ()=>{})
})

function toClassName(prefix, name) {
    name = name.replace(".svg", "")
    name = name[0].toUpperCase() + name.substring(1)
    name = name.replace(/(^|_|-)(\w)/g, function ($0, $1, $2) {
        return ($1 && '') + $2.toUpperCase();
    });

    name = "Icon" + prefix[0].toUpperCase() + prefix.substring(1) + name
    name = name.replace(/-|_/g, "")
    
    return name
}