<script lang="ts">
    export let value
    export let label: string = ''
    export let hint: string = 'Masukkan ' + label
    export let dark: boolean = false
</script>

<div class="w-full {$$props.class}">
    {#if label.length > 0}
        <label class="font-bold text-base mb-2 {dark && 'text-white'}">{label}</label>
    {/if}
    <div class="relative w-full">
        {#if $$slots.start}
            <div class="absolute inset-y-0 left-0 z-10 pl-2 flex items-center text-gray-400">
                <slot name="start"/>
            </div>
        {/if}
        <input type="text"
               placeholder={hint}
               bind:value
               on:input
               on:keydown
               {...$$restProps}
               class="bg-white shadow-none border border-gray-300 placeholder:text-gray-400"
               class:pl-10={$$slots.start}
               class:pr-10={$$slots.end}>
        {#if $$slots.end}
            <div class="absolute inset-y-0 right-0 z-10 pr-2 flex items-center text-gray-400">
                <slot name="end"/>
            </div>
        {/if}
    </div>
</div>
