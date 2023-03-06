<script lang="ts">
	import ModalTitle from "$lib/common/ui/dialog/ModalTitle.svelte"
	import FormDialogContent from "$lib/common/ui/dialog/FormDialogContent.svelte"
	import Button from "$lib/common/ui/button/Button.svelte"
	import {createEventDispatcher} from "svelte"

	export let title: string = ''
	export let showCloseButton: boolean = false
	export let isFormValid: boolean = true
	export let isSaving: boolean = false
	export let showDivider: boolean = false

	const dispatch = createEventDispatcher()
</script>

<div class="space-y-2 {$$props.class}">
    <ModalTitle {title} {showCloseButton} on:close/>
    <FormDialogContent {isFormValid} {isSaving} {showDivider} on:save>
        <slot/>
        <slot slot="buttons" name="buttons">
            <Button type="button" on:click={() => isSaving || dispatch('close')}>Kembali</Button>
            <Button type="submit" isLoading={isSaving} disabled={!isFormValid} class="variant-filled-secondary">
                Simpan
            </Button>
        </slot>
    </FormDialogContent>
</div>
