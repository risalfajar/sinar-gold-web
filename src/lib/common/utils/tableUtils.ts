import {createTable, DisplayBodyCell, TableState} from "svelte-headless-table"
import {get, Readable} from "svelte/store"
import {Schema} from "read-excel-file"
import {addSortBy} from "svelte-headless-table/plugins"

export function getRowData<T>(state: TableState<T>, cell: DisplayBodyCell<T>): T {
    const list = get(state.data)
    const id = cell.row.id
    // @ts-ignore
    return list[id]
}

export function createTableFromSchema(schema: Schema, data: Readable<any[]>) {
    const columnTitles = Object.keys(schema)
    const accessors = Object.values(schema).map(it => it.prop)

    const table = createTable(data, {
        sort: addSortBy({initialSortKeys: [{id: accessors[0], order: 'asc'}]})
    })
    const columns = table.createColumns(
        columnTitles.map((title, index) => table.column({
                header: title,
                accessor: accessors[index]
            })
        )
    )
    return table.createViewModel(columns)
}
