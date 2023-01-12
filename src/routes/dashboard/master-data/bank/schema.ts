import {Schema} from "read-excel-file"

export const schema: Schema = {
    'No Akun': {
        prop: 'number',
        type: String,
        required: true
    },
    'Kode Bank': {
        prop: 'bankCode',
        type: String,
        required: true
    },
    'Nama Bank': {
        prop: 'bankName',
        type: String,
        required: true
    }
}
