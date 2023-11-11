import { lazy as reactLazy} from "react";

const routes:Array<any> = []

export const lazy = {
    config (path:string, importStatement:any, preload = false) {
        const Component:any = reactLazy(importStatement);
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
    
        
        return Component;
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
    }
}
