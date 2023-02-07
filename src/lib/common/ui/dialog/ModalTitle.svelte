<script lang="ts">
    import {createEventDispatcher} from "svelte"
    import IconButton from "$lib/common/ui/button/IconButton.svelte"

    export let title: string = ''
    export let showCloseButton: boolean = false

    const dispatch = createEventDispatcher()
</script>

<div>
    <div class="flex flex-row justify-between items-center">
        <span class="modal-header text-xl font-bold">{title}</span>
        {#if showCloseButton}
            <IconButton on:click={() => dispatch('close')}>
                <i class="material-icons">close</i>
            </IconButton>
        {/if}
    </div>
    <hr/>
</div>
