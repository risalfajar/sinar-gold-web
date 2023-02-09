<script lang="ts">
    import InputWrapper from "$lib/common/ui/form/InputWrapper.svelte"

    export let value: number
    export let label: string = ''
    export let hint: string = 'Masukkan ' + label
    export let dark: boolean = false
</script>

<InputWrapper let:classes {label} {dark}>
    <input type="number"
           step="1"
           min="0"
           placeholder={hint}
           bind:value
           on:input
           on:keydown
           {...$$restProps}
           class="input {classes} invalid:!border-error-500">
</InputWrapper>
