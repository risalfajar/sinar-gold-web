import {Schema} from "read-excel-file"

export const schema: Schema = {
    'Kode Marketplace': {
        prop: 'code',
        type: String,
        required: true
    },
    'Nama Marketplace': {
        prop: 'name',
        type: String,
        required: true
    }
}
