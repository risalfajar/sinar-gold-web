import {ReadOrWritable} from "svelte-headless-table/lib/utils/store"
import {createRender, createTable} from "svelte-headless-table"
import {addSortBy, addTableFilter} from "svelte-headless-table/plugins"
import TableActions from "$lib/common/ui/table/TableActions.svelte"
import {getRowData} from "$lib/common/utils/tableUtils"
import {Schema} from "read-excel-file"

export function createMasterDataTable<T extends any>(
    data: ReadOrWritable<T[]>,
    schema: Schema,
    initialSortKey: keyof T,
    onEdit: (item: T) => void,
    onDelete: (item: T) => void,
) {
    const columnTitles = Object.keys(schema)
    const accessors = Object.values(schema).map(it => it.prop as keyof T)

    const table = createTable(data, {
        sort: addSortBy({initialSortKeys: [{id: initialSortKey as string, order: 'asc'}]}),
        tableFilter: addTableFilter()
    })
    const columns = table.createColumns([
        ...columnTitles.map((title, index) => table.column({
                header: title,
                accessor: accessors[index]
            })
        ),
        table.display({
            id: 'actions',
            header: 'Actions',
            cell: (cell, state) => createRender(TableActions as any)
                .on('edit', () => onEdit(getRowData(state, cell)))
                .on('delete', () => onDelete(getRowData(state, cell)))
        })
    ])
    return table.createViewModel(columns)
}
