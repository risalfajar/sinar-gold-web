export function removeIndex(array: any[], index: number | string) {
    if (typeof index === "number")
        array.splice(index, 1)
    else
        array.splice(Number(index), 1)
    return array
}
