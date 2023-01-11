import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kondisi Barang': {
        prop: 'condition',
        type: String,
        required: true
    },
}
