import {DisplayBodyCell, TableState} from "svelte-headless-table"
import {get} from "svelte/store"

export function getRowData<T>(state: TableState<T>, cell: DisplayBodyCell<T>): T {
    const list = get(state.data)
    const id = cell.row.id
    // @ts-ignore
    return list[id]
}
