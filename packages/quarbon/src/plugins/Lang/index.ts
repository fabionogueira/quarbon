type TObserverCallback = (definition:Record<string, Record<string, string>>, name?:string) => void;

const FNS:any = {}
const allLangs: Record<string, any> = {en:{}};
const allObservers: Array<TObserverCallback> = [];

let activeLang:any
let activeLangName:string = localStorage.getItem('__lang__') || navigator.language

export const Lang = {
    create(lang:string, group:string, definition:Record<string, string>) {
        allLangs[lang] = allLangs[lang] || {};
        allLangs[lang][group] = definition;
    },

    set(name: string) {
        let n;
        let value = allLangs[name];

        if (!value) {
            n = name.split("-")[0];
            value = allLangs[n];
        }

        if (value) {
            n = activeLangName;
            activeLangName = name;
            activeLang = value;
            localStorage.setItem('__lang__', name);
            if (n != name) allObservers.forEach(fn => fn(value, name));
        }
    },

    get<T>(group:string) : T{
        if (activeLang) {
            return activeLang[group] || allLangs.en[group]
        } else {
            return allLangs.en[group]
        }
    },


    // get(key:string = '', _default = null) {
    //     if (arguments.length == 0) {
    //         return LANGS[activeLangName] || LANGS["en-US"]
    //     }
    //
    //     return activeLang ? (activeLang[key] || _default) : _default
    // },

    name() {
        return activeLangName
    },

    // examples:
    // using array values is (@?, @?, @?)
    // using object values is (@p1, @p2, @p3)
    pharse(text: string, values:Array<string> | Record<string, any>) {
        if (Array.isArray(values)) {
            values.forEach(value => {
                text = text.replace('@?', value)
            })
        } else {
            Object.keys(values).forEach(key => {
                text = text.replace(`@${key}`, values[key])
            })
        }

        return text
    },

    translate(text: string) {
        let k: string
        let a: any

        if (!activeLang || !text) {
            return text
        }

        if (text.startsWith('$')) {
            a = text.split(' ')
            k = a[0].substring(1)
            a.shift()
            return a.join(' ')
        }

        a = text.split("|")
        if (a.length == 1) {
            return text
        }

        k = a[0].trim()
        a.shift()

        return activeLang[k] || a[1]
    },

    observe(callback: TObserverCallback) {
        allObservers.push(callback);
    },

    unobserve(callback: TObserverCallback) {
        let index = allObservers.findIndex(fn => fn == callback);

        if (index >= 0)
            allObservers.splice(index, 1);
    }
}

export function plural(key:string, count:number = 0) {
    let fn
    let item = activeLang[key] || []
    let last = item.length - 1
    let i = count > last ? last : count

    fn = textToFunction(key, item[i])

    return fn(count, activeLang.messages)
}

export function capitalize(key:string) {
    let text = activeLang[key] || key

    if (typeof(text) =='string') {
        return text.charAt(0).toLocaleUpperCase() + text.substring(1).toLocaleLowerCase();
    }

    return key
}

function textToFunction(key:string, text:string) {
    let fn = FNS[key]

    if (!fn) {
        // eslint-disable-next-line
        fn = FNS[key] = Function('count', 'ctx', 'return `' + text + '`')
    }

    return fn
}