import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Etalase': {
        prop: 'code',
        type: String,
        required: true
    },
    'Nama Etalase': {
        prop: 'name',
        type: String,
    }
}
