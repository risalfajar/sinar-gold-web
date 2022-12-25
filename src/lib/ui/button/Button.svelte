<script lang="ts">
    import {ProgressRadial} from "@skeletonlabs/skeleton"
    import {createEventDispatcher} from "svelte"

    const dispatch = createEventDispatcher()

    export let variant: 'filled' | 'ringed' | 'ghost' = 'filled'
    export let color: 'primary' | 'accent' | 'tertiary' | 'warning' | 'surface' | '' = 'primary'
    export let disabled: boolean = false
    export let isLoading: boolean = false

    let btnClass = 'btn-' + variant + (color.length > 0 ? '-' : '') + color
</script>

<button {...$$restProps} class="btn font-bold {btnClass} {$$props.class}" {disabled} on:click={() => isLoading || dispatch('click')}>
    {#if isLoading}
        <ProgressRadial class="w-4 mr-2 !opacity-100"/>
    {/if}
    <slot/>
</button>
