import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Group': {
        prop: 'groupCode',
        type: String,
        required: true
    },
    'Gram': {
        prop: 'weight',
        type: Number,
        required: true
    },
    'Poin': {
        prop: 'point',
        type: Number,
        required: true
    },
}
