<script lang="ts">
    import AppLogo from "$lib/ui/AppLogo.svelte"
    import TextInput from "$lib/ui/form/TextInput.svelte"
    import PasswordInput from "$lib/ui/form/PasswordInput.svelte"
    import {MIN_PASSWORD_LENGTH} from "$lib/constants"
    import Button from "$lib/ui/button/Button.svelte"
    import {signIn} from "$lib/auth/authManager"
    import {errorToast} from "$lib/utils/toastUtils"

    let username = ''
    let password = ''
    let isLoading = false

    $: isFormValid = username.length > 0 && password.length >= MIN_PASSWORD_LENGTH

    async function login() {
        isLoading = true
        try {
            await signIn(username, password)
        } catch (err) {
            console.error(err)
            errorToast('Login gagal, periksa kembali username dan password anda')
        }
        isLoading = false
    }
</script>

<div class="w-screen h-screen flex justify-center items-center">
    <form class="w-full max-w-[75%] lg:max-w-[50%] xl:max-w-[30%] bg-secondary-500 rounded-3xl shadow-lg flex flex-col items-center justify-between gap-y-4 p-8"
          on:submit|preventDefault={isFormValid && login}>
        <AppLogo logoText class="mb-12"/>
        <TextInput dark label="Username" bind:value={username}/>
        <PasswordInput dark bind:value={password}/>
        <Button action="submit" class="mt-4 btn-filled-primary" disabled={!isFormValid} {isLoading}>Masuk</Button>
    </form>
</div>
