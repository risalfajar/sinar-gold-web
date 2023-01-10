<script lang="ts">
    import Button from "$lib/common/ui/button/Button.svelte"
    import {modalStore} from "@skeletonlabs/skeleton"
    import {createEventDispatcher} from "svelte"

    export let isFormValid: boolean = true
    export let isSaving: boolean = false

    const dispatch = createEventDispatcher()
</script>

<!-- -mx-1 is needed so we can apply px-1 to the form, because showing scrollbar without adding padding clipped the form content -->
<div class="flex flex-col max-h-[75vh] w-full -mx-1">
    <hr class="opacity-50"/>
    <form class="min-w-fit flex flex-col overflow-y-hidden" on:submit|preventDefault={() => isFormValid && dispatch('save')}>
        <div class="flex flex-col gap-4 px-1 py-4 overflow-y-auto">
            <slot></slot>
        </div>
        <div class="flex flex-row px-1 justify-end gap-2 mt-4">
            <Button type="button" on:click={() => isSaving || modalStore.close()}>Kembali</Button>
            <Button type="submit" isLoading={isSaving} disabled={!isFormValid} class="btn-filled-secondary">
                Simpan
            </Button>
        </div>
    </form>
</div>
