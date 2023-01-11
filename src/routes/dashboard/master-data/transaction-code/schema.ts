import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Transaksi': {
        prop: 'code',
        type: String,
        required: true
    }
}
