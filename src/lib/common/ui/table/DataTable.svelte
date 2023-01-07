<script lang="ts">
    import {Render, Subscribe, TableViewModel} from "svelte-headless-table"

    export let model: TableViewModel<unknown>

    let {headerRows, rows, tableAttrs, tableBodyAttrs} = model
</script>

<table {...$tableAttrs}>
    <thead>
    {#each $headerRows as headerRow (headerRow.id)}
        <Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
            <tr {...rowAttrs}>
                {#each headerRow.cells as cell (cell.id)}
                    <Subscribe attrs={cell.attrs()} let:attrs>
                        <th {...attrs}>
                            <Render of={cell.render()}/>
                        </th>
                    </Subscribe>
                {/each}
            </tr>
        </Subscribe>
    {/each}
    </thead>
    <tbody {...$tableBodyAttrs}>
    {#each $rows as row (row.id)}
        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <tr {...rowAttrs}>
                {#each row.cells as cell (cell.id)}
                    <Subscribe attrs={cell.attrs()} let:attrs>
                        <td {...attrs}>
                            <Render of={cell.render()}/>
                        </td>
                    </Subscribe>
                {/each}
            </tr>
        </Subscribe>
    {/each}
    </tbody>
</table>
