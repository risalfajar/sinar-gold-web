<script lang="ts" context="module">
    let globalId = 0
</script>

<script lang="ts">
    const id = "password-input-" + globalId++

    export let value
    export let label: string = ''
    export let hint: string = 'Masukkan ' + label
    export let dark: boolean = false
    export let showHelperText: boolean = true

    let showPassword = false

    $: type = showPassword ? 'text' : 'password'
</script>

<div class="w-full {$$props.class}">
    <label for={id} class="font-bold text-base mb-2 {dark && 'text-on-accent-token'}">{label}</label>
    <div class="relative w-full">
        <input
                {value}
                {type}
                {id}
                placeholder={hint}
                on:keydown
                on:input={(e) => value = e.target.value}
                {...$$restProps}/>
        <span class="absolute inset-y-0 right-0 z-10 pr-2">
            <button class="btn-icon" on:click={() => showPassword = !showPassword}>
                <i class="material-icons">{showPassword ? "visibility" : "visibility_off"}</i>
            </button>
        </span>
    </div>
    {#if showHelperText}
        <p class="pt-2 !text-xs !text-gray-300">Minimal 7 karakter</p>
    {/if}
</div>
