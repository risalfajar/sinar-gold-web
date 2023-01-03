<script lang="ts">
    import {debounce} from 'lodash-es'
    import TextInput from "$lib/ui/form/TextInput.svelte"

    export let value = ''
    export let hint = 'Cari Item'
    export let debounceMs = 250

    let tempValue = value

    const debounceChangeValue = debounce(changeValue, debounceMs)

    function changeValue() {
        value = tempValue
    }
</script>

<div class="flex flex-row flex-wrap justify-between gap-y-2 {$$props.class}">
    <TextInput {hint} bind:value={tempValue} on:keydown={debounceChangeValue}>
        <i slot="start" class="material-icons">search</i>
    </TextInput>
</div>
