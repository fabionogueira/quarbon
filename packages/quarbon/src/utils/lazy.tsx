import { lazy as reactLazy, useState} from "react";
import { Router, useLocation } from "react-router-dom";

let Comp:any = null
const routes:Array<any> = []

type TRenderProps = {
    path?: string
}

export function CreateRouter(routes:Array<any>) {
    routes.forEach((item) => addRoute(item, ""))
    
    function addRoute(item:any, path:string) {
        path = path + item.path
        item.path = path

        lazy.config(path, item.element)

        if (item.children) {
            item.children.forEach((child:any) => {
                addRoute(child, path)
            })
        }
    }
    
    function find(path:string, arr?:any) {
        let i:number, r:any, rr:any

        arr = arr || routes

        for (i = 0; i < arr.length; i++) {
            r = arr[i]
            if (path.startsWith(r.path)) {
                rr = r.children ? find(path, r.children) : r
                return rr || r
            }
        }

        return arr[arr.length - 1]
    }

    return function Render({path=""}:TRenderProps) {
        let item:any
        let loading = true

        const location = useLocation()
        const [, reRender] = useState(0)
        
        if (path) {
            item = find(location.pathname)
            // console.log(item)
            return <h1>OK</h1>
        }
    
        if (!lazy.isLoaded(location.pathname)) {
            console.log(location.pathname, "route first load")
    
            lazy.load(location.pathname, (Component: any) => {
                // 400ms: allows you to display the waiting screen without "blink" effect
                setTimeout(() => {
                    // force render
                    reRender(old => old + 1)
                },400)
            })
        
            if (!Comp) {
                // first load
                console.log(location.pathname, "app first load")
                return <LazyLoadingScreen />
            }
        } else {
            loading = false
            Comp = lazy.get(location.pathname).result
            console.log(location.pathname, "re render")
        }
    
        return (
            <>
                <Comp />
                {loading && <LazyLoadingScreen />}
            </>
        )
    }
}

export const lazy = {
    config (path:string, importStatement:any, preload = false) {
        const Component:any = reactLazy(importStatement);
        const def = {
            path,
            Component,
            loaded: false
        }

        Component.preload = importStatement;
        
        if (path) {
            Component.__path__ = path
        
            routes.push({
                path,
                Component,
                loaded: false
            })
        
            preload && lazy.load(path)
        } else {
            preload && Component.preload()
        }
    
        
        return def // Component;
    },

    load (path:string, done?:Function) {
        let Component: any = null
        let r = this.get(path)
        
        if (r.loaded) {
            done && done(r.Component)
            return
        }
    
        r.Component.preload()
            .then((module: any) => {
                Component = module.default
                r.result = Component
                r.loaded = true
            })
            .finally(() => {
                done && done(Component)
            })
    },

    isLoaded(path: string) {
        const r = this.get(path);
        return r?.loaded
    },

    get(path: string) {
        const r = routes.find((item) => path.startsWith(item.path))
        return r
    },

    exists (path: string) {
        return Boolean(this.get(path))
    },
}

export function LazyContent() {
    let loading = true

    const location = useLocation()
    const [, reRender] = useState(0)

    if (!lazy.isLoaded(location.pathname)) {
        console.log(location.pathname, "route first load")

        lazy.load(location.pathname, (Component: any) => {
            // 400ms: allows you to display the waiting screen without "blink" effect
            setTimeout(() => {
                // force render
                reRender(old => old + 1)
            },400)
        })
    
        if (!Comp) {
            // first load
            console.log(location.pathname, "app first load")
            return <LazyLoadingScreen />
        }
    } else {
        loading = false
        Comp = lazy.get(location.pathname).result
        console.log(location.pathname, "re render")
    }

    return (
        <>
            <Comp />
            {loading && <LazyLoadingScreen />}
        </>
    )
}

function LazyLoadingScreen() {
    return (
        <div className="wait">
            <h1>loading...</h1>
        </div>
    )
}