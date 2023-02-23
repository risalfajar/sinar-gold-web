<script lang="ts">
	import Button from "$lib/common/ui/button/Button.svelte"
	import {createEventDispatcher} from "svelte"
	import {closeModal} from "$lib/common/utils/modalUtils"

	export let isFormValid: boolean = true
	export let isSaving: boolean = false
	export let showDivider: boolean = true

	const dispatch = createEventDispatcher()
</script>

<!-- -mx-1 is needed so we can apply px-1 to the form, because showing scrollbar without adding padding clipped the form content -->
<div class="flex flex-col max-h-[75vh] w-full -mx-1">
    {#if showDivider}
        <hr/>
    {/if}
    <form class="min-w-fit flex flex-col overflow-y-hidden" on:submit|preventDefault={() => isFormValid && dispatch('save')}>
        <div class="flex flex-col gap-4 px-1 overflow-y-auto">
            <slot></slot>
        </div>
        <div class="flex flex-row px-1 justify-end gap-2 mt-4">
            <slot name="buttons">
                <Button type="button" on:click={() => isSaving || closeModal()}>Kembali</Button>
                <Button type="submit" isLoading={isSaving} disabled={!isFormValid} class="variant-filled-secondary">
                    Simpan
                </Button>
            </slot>
        </div>
    </form>
</div>
