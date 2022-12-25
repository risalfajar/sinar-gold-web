<script lang="ts" context="module">
    let globalId = 0
</script>

<script lang="ts">
    export let value
    export let label: string = ''
    export let hint: string = 'Masukkan ' + label
    export let dark: boolean = false

    const id = "text-input-" + globalId++
</script>

<div class="w-full {$$props.class}">
    <label for={id} class="font-bold text-base mb-2 {dark && 'text-on-accent-token'}">{label}</label>
    <input type="text" {id} placeholder={hint} bind:value {...$$restProps}>
</div>
