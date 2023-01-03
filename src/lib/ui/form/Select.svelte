<script lang="ts">
    export let value: string | null
    export let options: string[]
    export let values: string[] = options
    export let label: string = ''
    export let hint: string = '-Pilih ' + label + '-'
</script>

<div class="w-full {$$props.class}">
    {#if label.length > 0}
        <label class="font-bold text-base mb-2">{label}</label>
    {/if}
    <div class="relative w-full">
        {#if $$slots.start}
            <div class="absolute inset-y-0 left-0 z-10 pl-2 flex items-center text-gray-300">
                <slot name="start"/>
            </div>
        {/if}
        <select
                bind:value
                on:input
                on:keydown
                {...$$restProps}
                name={label}
                class="bg-white shadow-none border border-gray-300"
                class:text-gray-500={value.length === 0}
                class:pl-10={$$slots.start}
                class:pr-10={$$slots.end}>
            <option value="" disabled selected>{hint}</option>
            {#each options as option, index (option)}
                <option class="text-secondary-500" value={values[index]}>{option}</option>
            {/each}
        </select>
        {#if $$slots.end}
            <div class="absolute inset-y-0 right-0 z-10 pr-2 flex items-center text-gray-300">
                <slot name="end"/>
            </div>
        {/if}
    </div>
</div>
