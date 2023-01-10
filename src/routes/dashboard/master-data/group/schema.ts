import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Group': {
        prop: 'code',
        type: String,
        required: true
    },
    'Nama Group': {
        prop: 'name',
        type: String,
        required: true
    },
    'Jenis Group': {
        prop: 'type',
        type: String,
        required: true
    },
    'Harga': {
        prop: 'price',
        type: Number,
        required: true
    },
    'Harga Modal': {
        prop: 'capital',
        type: Number,
        required: true
    },
    'Berlian': {
        prop: 'diamond',
        type: String,
        required: true
    },
}
