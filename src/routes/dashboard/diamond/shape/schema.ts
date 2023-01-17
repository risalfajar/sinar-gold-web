import {ObjectSchema} from "$lib/common/types/objectSchema"
import {Diamond} from "$lib/diamond/diamond"

export const schema: ObjectSchema<Diamond> = {
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
