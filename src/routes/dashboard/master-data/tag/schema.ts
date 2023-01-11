import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Keterangan': {
        prop: 'description',
        type: String,
        required: true
    },
    'Berat Bandrol': {
        prop: 'weight',
        type: Number,
        required: true
    },
}
