<script lang="ts">
    import {debounce} from 'lodash-es'
    import InputWrapper from "$lib/common/ui/form/InputWrapper.svelte"

    export let value = ''
    export let hint = 'Cari Item'
    export let debounceMs = 250

    let tempValue = value

    const debounceChangeValue = debounce(changeValue, debounceMs)

    function changeValue() {
        value = tempValue
    }
</script>

<InputWrapper class={$$props.class} let:classes>
    <input type="text" placeholder={hint} bind:value={tempValue} on:keydown={debounceChangeValue} class={classes}/>
    <i slot="start" class="material-icons">search</i>
</InputWrapper>
