<script lang="ts">
    import InputWrapper from "$lib/common/ui/form/InputWrapper.svelte"

    export let value: string | null
    export let options: string[]
    export let values: string[] | null = null
    export let label: string = ''
    export let hint: string = '-Pilih ' + label + '-'

    $: _values = values ?? options
</script>

<InputWrapper let:classes {label}>
    <select
            bind:value
            on:input
            on:keydown
            {...$$restProps}
            name={label}
            class="input {classes}"
            class:text-gray-500={value.length === 0}>
        <option value="" disabled selected>{hint}</option>
        {#each options as option, index (option)}
            <option class="text-secondary-500" value={_values[index]}>{option}</option>
        {/each}
    </select>
</InputWrapper>
