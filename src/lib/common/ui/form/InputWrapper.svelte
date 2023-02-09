<script lang="ts">
    import Label from "$lib/common/ui/form/Label.svelte"

    export let label: string = ''
    export let helper: string = ''

    let classes = `${$$slots.start && 'pl-10'} ${$$slots.end && 'pr-10'}`
</script>

<div class="w-full {$$props.class}">
    {#if label.length > 0}
        <Label>{label}</Label>
    {/if}
    <div class="relative w-full">
        {#if $$slots.start}
            <div class="absolute inset-y-0 left-0 z-10 pl-2 flex items-center text-gray-400">
                <slot name="start"/>
            </div>
        {/if}
        <slot {classes}/>
        {#if $$slots.end}
            <div class="absolute inset-y-0 right-0 z-10 pr-2 flex items-center text-gray-400">
                <slot name="end"/>
            </div>
        {/if}
    </div>
    {#if helper.length > 0}
        <p class="pt-1 !text-xs !text-gray-700">{helper}</p>
    {/if}
</div>
