<script lang="ts">
	import Select from 'svelte-select'
	import InputWrapper from "$lib/common/ui/form/InputWrapper.svelte"

	export let label: string
	export let loadOptions: ((text: string) => Promise<any[]>) | null
	export let value: string | string[] = ''
	export let itemId: string = 'value'
	export let itemLabel: string = 'label'
	export let placeholder: string = `Cari ${label}`
	export let debounceWait: number = 500
	export let disabled: boolean = false
	export let required: boolean = false
</script>

<InputWrapper let:classes {label} {required}>
    <Select
            id="auto-complete-input"
            class="{classes}" {placeholder} {itemId} label={itemLabel} {loadOptions} {debounceWait} {disabled} {required}
            bind:value on:change on:clear>
        <p slot="empty" class="unstyled p-4">Data tidak ditemukan</p>
    </Select>
</InputWrapper>

<style global>
    #auto-complete-input:disabled {
        @apply !bg-transparent;
    }
</style>
