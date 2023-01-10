import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Gudang': {
        prop: 'code',
        type: String,
        required: true
    },
    'Nama Gudang': {
        prop: 'name',
        type: String,
        required: true
    },
}
