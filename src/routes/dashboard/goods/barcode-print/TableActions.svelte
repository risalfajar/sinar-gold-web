<script lang="ts">
	import {createEventDispatcher} from 'svelte'
	import IconButton from "$lib/common/ui/button/IconButton.svelte"

	const dispatch = createEventDispatcher()
</script>

<div class="flex flex-row justify-center" on:click|stopPropagation>
    <IconButton class="border" on:click={() => dispatch('print')}>
        <i class="material-icons text-primary-500">print</i>
    </IconButton>
</div>
