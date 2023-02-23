import {Schema} from "read-excel-file"

export const schema: Schema = {
	'Kode Markis': {
		prop: 'code',
		type: String,
		required: true
	},
	'Nama Markis': {
		prop: 'name',
		type: String,
		required: true
	},
}
