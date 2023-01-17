import {ObjectSchema} from "$lib/common/types/objectSchema"
import {Diamond} from "$lib/diamond/diamond"

export const schema: ObjectSchema<Diamond> = {
    'Kode Jenis Batu': {
        prop: 'code',
        type: String,
        required: true
    },
    'Nama Jenis Batu': {
        prop: 'name',
        type: String,
        required: true
    },
}
