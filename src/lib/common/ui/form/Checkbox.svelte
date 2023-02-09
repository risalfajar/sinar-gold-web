<script lang="ts">
    export let checked: boolean
    export let label: string
    export let value: string = label
</script>

<div class="flex flex-row gap-4 items-center">
    <input {...$$restProps} type="checkbox" class="checkbox transition duration-200 {$$props.class}" {value} bind:checked on:change on:click/>
    <label>{label}</label>
</div>
