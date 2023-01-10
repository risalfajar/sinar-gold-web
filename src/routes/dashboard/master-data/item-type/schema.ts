import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Group': {
        prop: 'groupCode',
        type: String,
        required: true
    },
    'Tipe Barang': {
        prop: 'name',
        type: String,
        required: true
    },
}
