<script lang="ts">
    import {ProgressRadial} from "@skeletonlabs/skeleton"
    import {createEventDispatcher} from "svelte"

    const dispatch = createEventDispatcher()

    export let disabled: boolean = false
    export let isLoading: boolean = false

    $: defaultClass = $$props?.class?.includes('btn-') ? '' : 'hoverable'
</script>

<button {...$$restProps} class="btn font-bold {defaultClass} {$$props.class}" {disabled} on:click={() => isLoading || dispatch('click')}>
    {#if isLoading}
        <ProgressRadial class="w-4 mr-2 !opacity-100"/>
    {/if}
    <slot/>
</button>
