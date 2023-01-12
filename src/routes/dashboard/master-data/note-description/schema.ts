import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Group': {
        prop: 'groupCode',
        type: String,
        required: true
    },
    'Keterangan': {
        prop: 'description',
        type: String,
        required: true
    },
}
