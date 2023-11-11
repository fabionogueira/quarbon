export function hasOwner(defaultValues: Record<string, any>, property: string) {
  return Object.prototype.hasOwnProperty.call(defaultValues, property)
}
