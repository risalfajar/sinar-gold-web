import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Jenis Group': {
        prop: 'type',
        type: String,
        required: true
    }
}
