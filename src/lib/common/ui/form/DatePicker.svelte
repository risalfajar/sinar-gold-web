<script lang="ts">
    import InputWrapper from "$lib/common/ui/form/InputWrapper.svelte"
    import SveltyPicker, {formatDate, parseDate} from 'svelty-picker'
    import {id} from "svelty-picker/i18n"
    import {SvelteComponentTyped} from "svelte"

    const locale: any = id

    export let value: Date = new Date()
    export let min: Date | undefined = undefined
    export let max: Date | undefined = undefined
    export let label: string = ''
    export let format = 'dd-mm-yyyy'

    let picker: SvelteComponentTyped
    let valueString: string

    $: onInput(value)
    $: onOutput(valueString)

    function onInput(value: Date) {
        valueString = formatDate(value, format, locale, 'standard')
    }

    // function format(date: Date) {
    //     // return DateTime.fromJSDate(date).toFormat(format)
    // }

    function onOutput(valueString: string) {
        value = parseDate(valueString, format, locale, 'standard')
        // value = DateTime.fromFormat(valueString, format).toJSDate()
    }
</script>

<InputWrapper let:classes {label}>
    <!--    <input type="date" {...$$restProps} min={formatDate(min)} max={formatDate(max)} class:classes bind:value={valueString}>-->
    <SveltyPicker {...$$restProps} {format} inputClasses="input {classes} min-w-[10em]" bind:value={valueString} bind:this={picker}/>
    <i slot="end" class="material-icons">calendar_month</i>
</InputWrapper>
