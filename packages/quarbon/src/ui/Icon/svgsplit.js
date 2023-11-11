/**
 * svgsplit.js
 * Arquivos svg gerados a partir de fonte de ícones geram um único svg
 * com uma tag <glyph /> para cada ícone. Esse script transforma esse tipo
 * de arquivo svg em vários svg's individuais
 */

const path = require("path")
const fs = require('fs')

//config
let pack = "md"
let input = "/home/fabio/Downloads/materialdesignicons-webfont.svg"
let output = "/home/fabio/Downloads"
let svgProps = 'viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'
//end config

let folder = output + "/" + path.basename(input).replace(".svg", "")

const svg = fs.readFileSync(input, "utf-8")
const lines = svg.split("<glyph")

if (!fs.existsSync(folder)){
    fs.mkdirSync(folder);
}
if (fs.existsSync(folder + "/" + pack)){
    fs.rmSync(folder + "/" + pack, { recursive: true });
}
fs.mkdirSync(folder + "/" + pack);

lines.forEach(line => {
    let a, n, d, c, f

    line = line.replace(/\n/g, "")
    a = line.split('glyph-name="')
    if (a[1]) {
        n = a[1].split('"')[0]
        a = line.split('d="')
        if (a[1]) {
            d = a[1].split('"')[0]
            c = `<svg ${svgProps}><path d="${d}" /></svg>`
            f = `${folder}/${pack}/${pack}-${n}.svg`
            fs.writeFile(f, c, { encoding:'utf8', flag:'w' }, ()=>{})
        }

    }
})
