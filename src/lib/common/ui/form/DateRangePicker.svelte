<script lang="ts">
	import DatePicker from "$lib/common/ui/form/DatePicker.svelte"
	import Label from "$lib/common/ui/form/Label.svelte"

	export let start: Date
    export let end: Date
    export let label: string = ''
</script>

<div class="w-full">
    {#if label.length > 0}
        <Label>{label}</Label>
    {/if}
    <div class="flex flex-row gap-2 items-center">
        <DatePicker bind:value={start} endDate={end}/>
        -
        <DatePicker bind:value={end} startDate={start} endDate={new Date()}/>
    </div>
</div>
