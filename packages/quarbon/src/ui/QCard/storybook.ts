
export function argsTypeFilter(args:any, filter:Array<string>) {
    let obj:any = {};
    filter.forEach(key => obj[key] = args[key])
    return obj;
}