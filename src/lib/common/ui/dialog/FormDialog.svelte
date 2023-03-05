<script lang="ts">
	import ModalTitle from "$lib/common/ui/dialog/ModalTitle.svelte"
	import FormDialogContent from "$lib/common/ui/dialog/FormDialogContent.svelte"

	export let title: string = ''
	export let showCloseButton: boolean = false
	export let isFormValid: boolean = true
	export let isSaving: boolean = false
	export let showDivider: boolean = false
</script>

<div class="space-y-2 {$$props.class}">
    <ModalTitle {title} {showCloseButton} on:close/>
    <FormDialogContent {isFormValid} {isSaving} {showDivider} on:save>
        <slot/>
    </FormDialogContent>
</div>
