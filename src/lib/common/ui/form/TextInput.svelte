<script lang="ts">
	import InputWrapper from "$lib/common/ui/form/InputWrapper.svelte"

	export let value
    export let label: string = ''
    export let helper: string = ''
    export let hint: string = 'Masukkan ' + label
    export let dark: boolean = false
    export let required: boolean = false
</script>

<InputWrapper let:classes {label} {dark} {helper} {required}>
    <input type="text"
           placeholder={hint}
           bind:value
           on:input
           on:keydown
           {...$$restProps}
           class="input {classes}">
</InputWrapper>
