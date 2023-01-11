import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Gudang': {
        prop: 'warehouseCode',
        type: String,
        required: true
    },
    'Kode Talang': {
        prop: 'code',
        type: String,
        required: true
    },
    'Nama Talang': {
        prop: 'name',
        type: String,
        required: true
    },
    'Berat Talang': {
        prop: 'weight',
        type: Number,
        required: true
    },
    'Berat Bandrol': {
        prop: 'tagWeight',
        type: Number,
        required: true
    },
}
