import {ObjectSchema} from "$lib/common/types/objectSchema"
import {Diamond} from "$lib/diamond/diamond"

export const schema: ObjectSchema<Diamond> = {
    'Kode Master Supplier': {
        prop: 'code',
        type: String,
        required: true
    },
    'Nama Master Supplier': {
        prop: 'name',
        type: String,
        required: true
    },
}
