<script lang="ts">
	import InputWrapper from "$lib/common/ui/form/InputWrapper.svelte"

	const formatter = new Intl.NumberFormat('id-ID', {
        maximumFractionDigits: 0
    })

    export let value: number = 0
    export let label: string = ''
    export let hint: string = 'Masukkan ' + label
    export let dark: boolean = false
	export let required: boolean = false

    let input: HTMLInputElement
    let formattedValue: string

    $: formattedValue = formatValue(value)
    $: if (formattedValue && input) input.value = formattedValue

    function handleInput() {
        const cleanedValue = cleanValue(input.value)
        value = cleanedValue.length === 0 ? 0 : parseInt(cleanedValue, 10)
        formattedValue = formatValue(value)
    }

    function cleanValue(value: string) {
        return value
            .replace(/\D*/gm, '') // remove non digits
            .replace(/^0+/gm, '') // remove leading zeros
    }

    function formatValue(value: number) {
        return formatter.format(value)
    }
</script>

<InputWrapper let:classes {label} {dark} {required}>
    <input type="tel"
           placeholder={hint}
           bind:this={input}
           on:input={handleInput}
           {required}
           {...$$restProps}
           class="input {classes}">
</InputWrapper>
