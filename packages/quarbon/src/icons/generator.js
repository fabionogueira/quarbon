import path from "path"
import fs from "fs"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const headers = [
    '//https://carbondesignsystem.com/guidelines/icons/library/\n',
    'import { GenIcon, IconBaseProps } from "react-icons"'
];
const template ="\nexport const #NAME# = (props:IconBaseProps) : JSX.Element => (GenIcon(#JSON# as any)(props));"

const sourceFile = `${__dirname}/_data.json`
const data = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
let classes = "";

Object.entries(data).forEach(([key, value]) => {
    classes += createClass(key, value);
})

fs.writeFile(`${__dirname}/cb.ts`, `${headers.join("\n")}\n${classes}\n`, { encoding: 'utf8', flag: 'w' }, () => { })

function createClass(name, content) {
    const obj = svgParse(content)
    const cls = template
        .replace("#JSON#", JSON.stringify(obj))
        .replace("#NAME#", name)

    return cls
}

function svgParse(strSvg) {
    const obj = {
        "tag": "svg",
        "attr": attrs(strSvg),
        "child": []
    }
    const ar1 = strSvg.split(">"); ar1.shift();
    const str = ar1.join(">").replace("</svg>", "")
    const ar2 = str
        .split("<")
        .filter(s => !!s)
        .filter(s => !s.startsWith("/"))
        .map(s => {
            const tag = s.split(" ")[0];

            return {
                tag,
                content: `<${s}`
            }
        })

    ar2.forEach(({ tag, content }) => {
        obj.child.push({
            tag,
            attr: attrs(content),
        })
    })

    return obj
}

function attrs(str) {
    const obj = {}

    str = str.split(">")[0]

    str.replace(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g, function ($0, name, value) {
        value = value.replace(/"/g, "");
        obj[name] = value;
    })

    return obj;
}
