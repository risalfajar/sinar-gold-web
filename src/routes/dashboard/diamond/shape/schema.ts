import {ObjectSchema} from "$lib/common/types/objectSchema"
import {DiamondShape} from "$lib/diamond/shape/shape"

export const schema: ObjectSchema<DiamondShape> = {
    'Kode Batu Shape': {
        prop: 'code',
        type: String,
        required: true
    },
    'Nama Batu Shape': {
        prop: 'name',
        type: String,
        required: true
    },
}
