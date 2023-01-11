import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Intern': {
        prop: 'code',
        type: String,
        required: true
    },
    'Nominal': {
        prop: 'amount',
        type: Number,
        required: true
    },
    'Persentase': {
        prop: 'percentage',
        type: Number,
        required: true
    },
    'Tipe Ongkos': {
        prop: 'type',
        type: String,
        required: true
    },
}
