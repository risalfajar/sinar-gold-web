<script lang="ts">
    import TextInput from "$lib/ui/form/TextInput.svelte"

    export let value
    export let label: string = 'Password'
    export let hint: string = 'Masukkan ' + label
    export let dark: boolean = false
    export let showHelperText: boolean = true

    let showPassword = false

    $: type = showPassword ? 'text' : 'password'
</script>

<div class="w-full {$$props.class}">
    <TextInput
            {value}
            {type}
            {label}
            {hint}
            {dark}
            on:input={(e) => value = e.target.value}
            {...$$restProps}>
        <button tabindex="-1" slot="end" type="button" class="btn-icon" on:click={() => showPassword = !showPassword}>
            <i class="material-icons">{showPassword ? "visibility" : "visibility_off"}</i>
        </button>
    </TextInput>
    {#if showHelperText}
        <p class="pt-2 !text-xs {dark ? '!text-gray-300' : '!text-gray-700'}">Minimal 7 karakter</p>
    {/if}
</div>
