<script lang="ts">
    export let checked: boolean
    export let label: string
    export let value: string = label
    export let labelClass: string = ''
</script>

<div class="flex flex-row gap-4 items-center">
    <input {...$$restProps} type="checkbox" class="checkbox transition duration-200 {$$props.class}" {value} bind:checked on:change on:click/>
    <label class={labelClass}>{label}</label>
</div>
