import ShortUniqueId from "short-unique-id"

export function generateNumberId(length: number = 6) {
    const uid = new ShortUniqueId({length})
    uid.setDictionary('number')
    return uid()
}
