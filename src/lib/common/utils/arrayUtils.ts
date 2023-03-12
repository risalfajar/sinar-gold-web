export function removeIndex<T>(array: T[], index: number | string) {
    if (typeof index === "number")
        array.splice(index, 1)
    else
        array.splice(Number(index), 1)
    return array
}
