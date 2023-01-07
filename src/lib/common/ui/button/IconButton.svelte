<script lang="ts">
    import {ProgressRadial} from "@skeletonlabs/skeleton"
    import {createEventDispatcher} from "svelte"

    const dispatch = createEventDispatcher()

    export let disabled: boolean = false
    export let isLoading: boolean = false

    $: defaultClass = $$props?.class?.includes('btn-') ? '' : 'hoverable'
</script>

<button {...$$restProps} class="btn-icon p-1 {defaultClass} {$$props.class}" {disabled} on:click={() => isLoading || dispatch('click')}>
    {#if isLoading}
        <ProgressRadial class="w-6 !opacity-100"/>
    {:else }
        <slot/>
    {/if}
</button>
