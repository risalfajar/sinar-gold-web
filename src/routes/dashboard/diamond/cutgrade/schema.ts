import {ObjectSchema} from "$lib/common/types/objectSchema"
import {Diamond} from "$lib/diamond/diamond"

export const schema: ObjectSchema<Diamond> = {
    'Kode Batu Cut Grade': {
        prop: 'code',
        type: String,
        required: true
    },
    'Nama Batu Cut Grade': {
        prop: 'name',
        type: String,
        required: true
    },
}
