let index = 10000

export function Uid() {
    return `E${index++}_${Date.now()}`
}
