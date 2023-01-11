import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Toko': {
        prop: 'code',
        type: String,
        required: true
    },
    'Nama Toko': {
        prop: 'name',
        type: String,
        required: true
    },
}
