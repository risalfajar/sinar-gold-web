<script lang="ts">
    import Button from "$lib/ui/button/Button.svelte"
    import {modalStore} from "@skeletonlabs/skeleton"
    import {createEventDispatcher} from "svelte"

    export let title: string
    export let isFormValid: boolean = true
    export let isSaving: boolean = false

    const dispatch = createEventDispatcher()
</script>

<!-- -mx-1 is needed so we can apply px-1 to the form, because showing scrollbar without adding padding clipped the form content -->
<div class="flex flex-col max-h-[75vh] w-full -mx-1">
    <hr class="opacity-50"/>
    <form class="min-w-fit px-1 py-4 space-y-4 overflow-y-scroll" on:submit|preventDefault={() => isFormValid && dispatch('save')}>
        <slot></slot>
    </form>
    <div class="flex flex-row justify-end gap-2 mt-4 mx-1">
        <Button on:click={() => modalStore.close()}>Kembali</Button>
        <Button isLoading={isSaving} on:click={() => dispatch('save')} disabled={!isFormValid} type="submit" class="btn-filled-secondary">Tambah
        </Button>
    </div>
</div>
