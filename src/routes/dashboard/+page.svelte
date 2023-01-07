<script lang="ts">
    import {currentUser} from "$lib/common/stores"
    import {signOut} from "$lib/common/auth/authManager"
    import {errorToast} from "$lib/common/utils/toastUtils"
    import Button from "$lib/common/ui/button/Button.svelte"
    import IconButton from "$lib/common/ui/button/IconButton.svelte"
    import Illustration from "./dashboard/Illustration.svelte"

    let isSigningOut = false

    async function logout() {
        isSigningOut = true
        try {
            await signOut()
        } catch (e) {
            console.error(e)
            errorToast('Terjadi kesalahan')
        }
        isSigningOut = false
    }
</script>

<div class="w-full h-full grid grid-cols-6 grid-rows-1 gap-6">
    <div class="flex flex-col col-span-4 gap-6">
        <!--    Welcome Card    -->
        <div class="bg-primary-500 flex flex-row items-center justify-between [&_p]:text-white card">
            <div>
                <p class="unstyled font-extrabold text-2xl">Selamat Datang, {$currentUser?.name ?? ''}</p>
                <p class="unstyled text-lg">Have a nice day at work</p>
            </div>
            <Illustration class="h-28"/>
        </div>

        <div class="col-span-4 bg-white card h-24">
            <!-- TODO Statistic -->
        </div>

        <div class="col-span-4 bg-white card h-24">
            <!-- TODO Statistic Graph -->
        </div>
    </div>

    <div class="flex flex-col col-span-2 gap-6">
        <div class="bg-white card">
            <p class="unstyled text-secondary-500 font-bold text-lg">Profil</p>
            <div class="mt-4 [&_p]:font-semibold flex flex-row justify-between items-center">
                <div>
                    <p class="unstyled text-secondary-500">{$currentUser?.name}</p>
                    <p class="unstyled text-caption">Role: {$currentUser?.role}</p>
                </div>
                <IconButton isLoading={isSigningOut} on:click={logout}>
                    <i class="material-icons">logout</i>
                </IconButton>
            </div>
        </div>

        <div class="card bg-white flex flex-col">
            <p class="unstyled text-secondary-500 font-bold text-lg">Hasil Penjualan Sales</p>
            <div class="max-h-full overflow-y-auto my-4">
                <!-- TODO sales results -->
                <p class="unstyled text-caption">Tidak ada penjualan hari ini</p>
            </div>
            <Button class="self-end font-normal text-primary-500">lihat semua...</Button>
        </div>
    </div>
</div>

<style>
    .card {
        @apply rounded-3xl p-6 shadow-lg shadow-gray-300;
    }
</style>
