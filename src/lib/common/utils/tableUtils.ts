import {createRender, createTable, DisplayBodyCell, TableState} from "svelte-headless-table"
import {get} from "svelte/store"
import {Schema} from "read-excel-file"
import {addSortBy, addTableFilter} from "svelte-headless-table/plugins"
import {ReadOrWritable} from "svelte-headless-table/lib/utils/store"
import TableActions from "$lib/common/ui/table/TableActions.svelte"

export function getRowData<T>(state: TableState<T>, cell: DisplayBodyCell<T>): T {
    const list = get(state.data)
    const id = cell.row.id
    // @ts-ignore
    return list[id]
}

export function createDataTable<T extends any>(
    data: ReadOrWritable<T[]>,
    schema: Schema,
    initialSortKey?: keyof T,
    onEdit?: (item: T) => void,
    onDelete?: (item: T) => void,
) {
    const columnTitles = Object.keys(schema)
    const accessors = Object.values(schema).map(it => it.prop as keyof T)

    const table = createTable(data, {
        sort: addSortBy({initialSortKeys: initialSortKey && [{id: initialSortKey as string, order: 'asc'}]}),
        tableFilter: addTableFilter()
    })
    const columns = [
        ...columnTitles.map((title, index) => table.column({
                header: title,
                accessor: accessors[index]
            })
        ),
        table.display({
            id: 'actions',
            header: 'Actions',
            cell: (cell, state) => createRender(TableActions as any)
                .on('edit', () => onEdit && onEdit(getRowData(state, cell)))
                .on('delete', () => onDelete && onDelete(getRowData(state, cell)))
        })
    ]
    if (!onEdit && !onDelete)
        columns.pop()

    return table.createViewModel(table.createColumns(columns))
}
