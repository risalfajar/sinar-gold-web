<script lang="ts">
	import InputWrapper from "$lib/common/ui/form/InputWrapper.svelte"
	import SveltyPicker, {formatDate, parseDate} from 'svelty-picker'
	import {id} from "svelty-picker/i18n"
	import {SvelteComponentTyped} from "svelte"

	const locale: any = id

    export let value: Date = new Date()
    export let label: string = ''
    export let format = 'dd-mm-yyyy'

    let picker: SvelteComponentTyped
    let valueString: string

    $: onInput(value)
    $: onOutput(valueString)

    function onInput(value: Date) {
        valueString = formatDate(value, format, locale, 'standard')
    }

    function onOutput(valueString: string) {
        value = parseDate(valueString, format, locale, 'standard')
    }
</script>

<InputWrapper let:classes {label}>
    <SveltyPicker {...$$restProps} {format} i18n={locale} inputClasses="input {classes} min-w-[10em]" bind:value={valueString} bind:this={picker}/>
    <i slot="end" class="material-icons">calendar_month</i>
</InputWrapper>
