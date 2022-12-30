<script lang="ts">
    export let value
    export let label: string = ''
    export let hint: string = 'Masukkan ' + label
    export let dark: boolean = false
</script>

<div class="w-full {$$props.class}">
    {#if label.length > 0}
        <label class="font-bold text-base mb-2 {dark && 'text-on-accent-token'}">{label}</label>
    {/if}
    <input type="text" placeholder={hint} bind:value {...$$restProps}>
</div>
