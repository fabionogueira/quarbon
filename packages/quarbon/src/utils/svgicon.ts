const REGISTEREDS:{[key:string] : TIconDefinition} = {}

type TIconDefinition = {
    viewBox?: string,
    content: string
}

type TCreateOptions = {
    class?: string,
    size?: string,
    style?: string,
    color?: string
}

export const SvgIcon = {
    /**
     * @description register svg icons: {
     *      "icon-name": {
     *          viewBox:"0 0 width height", // the viewBox svg attribute
     *          content:'svg content' // svg without <svg> tag
     *      }
     * }
     */
    set(name:string, definition:TIconDefinition) {
        REGISTEREDS[name] = definition
    },

    get(name:string) {
        return REGISTEREDS[name]
    },

    getAll() {
        return REGISTEREDS
    },

    create(name:string, options:TCreateOptions){
        const data = REGISTEREDS[name]
        const cls = options.class ? `${options.class} ` : '' // + (options.size ? `icon-size-${options.size || ''}` : '') 
        const style:any = Object.assign(
            {}, 
            (options.size ? {width:`${options.size}`, height:`${options.size}`} : {}),
            (options.color ? {fill:options.color} : {}),
            (options.style || {})
        )
        let strStyle = ''

        Object.keys(style).forEach((k:string) => {
            strStyle += `${k}:${style[k]}`
        })

        return {
            innerHTML: data ? data.content :  `<use xlink:href="#${name}"></use>`,
            class: cls,
            style: style,
            strStyle,
            viewBox: data ? data.viewBox : undefined
        }
    },

}
