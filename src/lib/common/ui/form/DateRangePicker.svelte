<script lang="ts">
    import DatePicker from "$lib/common/ui/form/DatePicker.svelte"

    export let start: Date
    export let end: Date
    export let label: string = ''
</script>

<div class="w-full">
    {#if label.length > 0}
        <label class="font-bold text-base mb-2">{label}</label>
    {/if}
    <div class="flex flex-row gap-2 items-center">
        <DatePicker bind:value={start} endDate={end}/>
        -
        <DatePicker bind:value={end} startDate={start}/>
    </div>
</div>
