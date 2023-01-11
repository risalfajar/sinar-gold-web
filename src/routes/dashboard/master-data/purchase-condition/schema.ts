import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Kondisi Pembelian': {
        prop: 'code',
        type: String,
        required: true
    },
    'Potongan Harga': {
        prop: 'discount',
        type: Number,
        required: true
    },
    'Persentase': {
        prop: 'percentage',
        type: Number,
        required: true
    },
}
