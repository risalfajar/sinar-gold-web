<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import IconButton from "$lib/common/ui/button/IconButton.svelte"

    const dispatch = createEventDispatcher<{ edit: never, delete: never }>()

    export let disableDeleteButton = false
    export let showEditButton = true
</script>

<div class="flex flex-row justify-center space-x-2" on:click|stopPropagation>
    <slot name="prefix"/>
    {#if showEditButton}
        <IconButton class="border" on:click={() => dispatch('edit')}>
            <i class="material-icons text-secondary-500">edit</i>
        </IconButton>
    {/if}
    <IconButton class="border" disabled={disableDeleteButton} on:click={() => dispatch('delete')}>
        <i class="material-icons text-error-500">delete</i>
    </IconButton>
</div>
