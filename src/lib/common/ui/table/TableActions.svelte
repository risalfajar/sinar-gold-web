<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    import IconButton from "$lib/common/ui/button/IconButton.svelte"

    const dispatch = createEventDispatcher<{ edit: never, delete: never }>()

    export let disableDeleteButton = false
</script>

<div class="flex flex-row space-x-2">
    <slot name="prefix"/>
    <IconButton class="border" on:click={(e) => {e.stopPropagation(); dispatch('edit')}}>
        <i class="material-icons text-secondary-500">edit</i>
    </IconButton>
    <IconButton class="border" disabled={disableDeleteButton} on:click={(e) => {e.stopPropagation(); dispatch('delete')}}>
        <i class="material-icons text-error-500">delete</i>
    </IconButton>
</div>
