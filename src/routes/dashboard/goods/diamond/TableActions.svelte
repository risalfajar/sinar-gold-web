<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import IconButton from "$lib/common/ui/button/IconButton.svelte"

	const dispatch = createEventDispatcher()
</script>

<div class="flex flex-row justify-center space-x-2" on:click|stopPropagation>
    <IconButton class="border" on:click={() => dispatch('copy')}>
        <i class="material-icons text-primary-500">content_copy</i>
    </IconButton>
    <IconButton class="border" on:click={() => dispatch('edit')}>
        <i class="material-icons text-secondary-500">edit</i>
    </IconButton>
    <IconButton class="border" on:click={() => dispatch('delete')}>
        <i class="material-icons text-error-500">delete</i>
    </IconButton>
</div>
