import {ObjectSchema} from "$lib/common/types/objectSchema"
import {DiamondColor} from "$lib/diamond/color/color"

export const schema: ObjectSchema<DiamondColor> = {
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
