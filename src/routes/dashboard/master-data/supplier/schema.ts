import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Supplier': {
        prop: 'code',
        type: String,
        required: true
    },
    'Nama Supplier': {
        prop: 'name',
        type: String,
        required: true
    },
}
