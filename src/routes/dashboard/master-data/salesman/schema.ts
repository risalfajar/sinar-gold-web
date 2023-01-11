import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Salesman': {
        prop: 'code',
        type: String,
        required: true
    },
    'Nama Salesman': {
        prop: 'name',
        type: String,
        required: true
    },
}
