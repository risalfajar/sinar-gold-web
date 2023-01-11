import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Group': {
        prop: 'groupCode',
        type: String,
        required: true
    },
    'Nama Group': {
        prop: 'groupName',
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
}
