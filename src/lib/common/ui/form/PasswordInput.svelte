<script lang="ts">
    import InputWrapper from "$lib/common/ui/form/InputWrapper.svelte"

    export let value
    export let label: string = 'Password'
    export let hint: string = 'Masukkan ' + label
    export let dark: boolean = false
    export let showHelperText: boolean = true

    let showPassword = false

    $: type = showPassword ? 'text' : 'password'
</script>

<InputWrapper {label} {dark} class={$$props.class} let:classes helper={showHelperText ? 'Minimal 7 karakter' : ''}>
    <input
            {value}
            {type}
            placeholder={hint}
            on:input={(e) => value = e.target.value}
            {...$$restProps}
            class={classes}>
    <button tabindex="-1" slot="end" type="button" class="btn-icon" on:click={() => showPassword = !showPassword}>
        <i class="material-icons">{showPassword ? "visibility" : "visibility_off"}</i>
    </button>
</InputWrapper>
