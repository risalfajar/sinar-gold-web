import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Group': {
        prop: 'groupCode',
        type: String,
        required: true
    },
    'Kode Jenis': {
        prop: 'code',
        type: String,
        required: true
    },
    'Nama Jenis': {
        prop: 'name',
        type: String,
        required: true
    },
}
