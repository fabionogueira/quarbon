const modules:{[key:string]:boolean} = {}

export function loader(path:string, type = 'js', async = true) {
    if (modules[path]) {
        return Promise.resolve()
    }

    return (type == 'css') ? loadCSS(path) : loadJS(path, async)
}

function loadJS(path:string, async:boolean) {
    return new Promise((resolve, reject) => {
        let script:any = document.createElement('script')

        script.onload = script.onreadystatechange = function () {
            if (modules[path]) {
                return
            }

            script.onload = script.onreadystatechange = null
            modules[path] = true
            resolve(true)
        }

        script.onerror = (err:Error) => {
            reject(err)
        }

        script.async = async
        script.src = path

        document.head.insertBefore(script, document.head.lastChild)
    })
}

function loadCSS(path:string) {
    return new Promise((resolve, reject) => {
        let style:any = document.createElement('link')

        style.setAttribute('rel', 'stylesheet')
        style.setAttribute('type', 'text/css')
        style.setAttribute('href', path)

        style.onload = style.onreadystatechange = () => {
            if (modules[path]) {
                return
            }

            style.onload = style.onreadystatechange = null
            modules[path] = true
            resolve(true)
        }

        style.onerror = (err:Error) => {
            reject(err)
        }

        document.head.insertBefore(style, document.head.lastChild)
    })
}