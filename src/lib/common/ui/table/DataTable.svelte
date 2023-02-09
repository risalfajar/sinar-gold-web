<script lang="ts">
    import {Render, Subscribe, TableViewModel} from "svelte-headless-table"
    import {fade} from "svelte/transition"
    import {ProgressRadial} from "@skeletonlabs/skeleton"
    import {createEventDispatcher} from "svelte"

    const dispatch = createEventDispatcher()

    export let model: TableViewModel<unknown>
    export let emptyText = "Tidak ada data"
    export let clickable = false
    export let isLoading = false

    let {headerRows, rows, tableAttrs, tableBodyAttrs} = model
</script>

<div class="border rounded-lg overflow-x-auto scrollbar-default {$$props.class}">
    <table {...$tableAttrs}>
        <thead>
        {#each $headerRows as headerRow (headerRow.id)}
            <Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs rowProps={headerRow.props()} let:rowProps>
                <tr {...rowAttrs}>
                    {#each headerRow.cells as cell (cell.id)}
                        <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
                            <th {...attrs} on:click={props.sort?.toggle} class:sortable={!props.sort?.disabled}>
                                {#key props.sort?.order}
                                <span class="flex flex-row justify-center items-center gap-2" in:fade>
                                    <Render of={cell.render()}/>
                                    {#if props.sort?.order === 'asc'}
                                        <i class="material-icons text-gray-500 text-base">arrow_downward</i>
                                    {:else if props.sort?.order === 'desc'}
                                        <i class="material-icons text-gray-500 text-base">arrow_upward</i>
                                    {/if}
                                </span>
                                {/key}
                            </th>
                        </Subscribe>
                    {/each}
                </tr>
            </Subscribe>
        {/each}
        </thead>

        <tbody {...$tableBodyAttrs}>
        {#if isLoading}
            <tr>
                <td colspan={$headerRows?.[0]?.cells?.length ?? 1}>
                    <div class="w-full flex items-center justify-center py-4">
                        <ProgressRadial class="w-8"/>
                    </div>
                </td>
            </tr>
        {:else}
            {#each $rows as row (row.id)}
                <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
                    <tr {...rowAttrs} class:clickable on:click={() => dispatch('click', $rows[row.dataId].original)}>
                        {#each row.cells as cell (cell.id)}
                            <Subscribe attrs={cell.attrs()} let:attrs>
                                <td {...attrs}>
                                    <Render of={cell.render()}/>
                                </td>
                            </Subscribe>
                        {/each}
                    </tr>
                </Subscribe>
            {:else}
                <tr>
                    <td colspan={$headerRows?.[0]?.cells?.length ?? 1} class="text-center">{emptyText}</td>
                </tr>
            {/each}
            {#if $rows.length > 0}
                <slot></slot>
            {/if}
        {/if}
        </tbody>
    </table>
</div>

<style>
    .sortable {
        @apply hover:bg-gray-100 transition;
    }
</style>
