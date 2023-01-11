import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Nama Hadiah': {
        prop: 'name',
        type: String,
        required: true
    },
    'Poin': {
        prop: 'point',
        type: Number,
        required: true
    },
    'Stock': {
        prop: 'stock',
        type: Number,
        required: true
    },
}
