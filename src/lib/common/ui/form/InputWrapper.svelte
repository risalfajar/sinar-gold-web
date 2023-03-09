<script lang="ts">
	import Label from "$lib/common/ui/form/Label.svelte"

	export let label: string = ''
	export let helper: string = ''
	export let dark: boolean = false
	export let required: boolean = false

	let classes = `${$$slots.start && 'pl-10'} ${$$slots.end && 'pr-10'}`
</script>

<div class="w-full {$$props.class}">
    {#if label.length > 0}
        <div class="flex">
            <Label {dark} class="whitespace-nowrap overflow-hidden overflow-ellipsis">{label}</Label>
            {#if required}
                <span class="text-error-500">*</span>
            {/if}
        </div>
    {/if}
    <div class="relative w-full">
        {#if $$slots.start}
            <div class="absolute overflow-hidden inset-y-0 left-0 z-5 pl-2 flex items-center text-gray-400">
                <slot name="start"/>
            </div>
        {/if}
        <slot {classes}/>
        {#if $$slots.end}
            <div class="absolute overflow-hidden inset-y-0 right-0 z-5 pr-2 flex items-center text-gray-400">
                <slot name="end"/>
            </div>
        {/if}
    </div>
    {#if helper.length > 0}
        <p class="pt-1 !text-xs !text-gray-700">{helper}</p>
    {/if}
</div>
