import {ObjectSchema} from "$lib/common/types/objectSchema"
import {DiamondSupplier} from "$lib/diamond/supplier/supplier"

export const schema: ObjectSchema<DiamondSupplier> = {
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
