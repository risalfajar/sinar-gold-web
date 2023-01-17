import {ObjectSchema} from "$lib/common/types/objectSchema"
import {Diamond} from "$lib/diamond/diamond"

export const schema: ObjectSchema<Diamond> = {
    'Kode Batu Color': {
        prop: 'code',
        type: String,
        required: true
    },
    'Nama Batu Color': {
        prop: 'name',
        type: String,
        required: true
    },
}
