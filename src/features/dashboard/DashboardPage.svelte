<script lang="ts">
    import {currentUser} from "src/features/common/stores"
    import Illustration from "src/features/dashboard/Illustration.svelte"
    import {signOut} from "src/lib/auth/authManager"
    import {errorToast} from "src/lib/utils/toastUtils"

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
            <p class="unstyled text-accent-500 font-bold text-lg">Profil</p>
            <div class="mt-4 [&_p]:font-semibold flex flex-row justify-between items-center">
                <div>
                    <p class="unstyled text-accent-500">{$currentUser?.name}</p>
                    <p class="unstyled text-caption">Role: {$currentUser?.role}</p>
                </div>
                <button class="btn-icon hoverable" on:click={logout}>
                    <i class="material-icons">logout</i>
                </button>
            </div>
        </div>

        <div class="card bg-white flex flex-col">
            <p class="unstyled text-accent-500 font-bold text-lg">Hasil Penjualan Sales</p>
            <div class="max-h-full overflow-y-auto my-4">
                <!-- TODO sales results -->
                <p class="unstyled text-caption">Tidak ada penjualan hari ini</p>
            </div>
            <button class="self-end btn text-primary-500 hoverable">lihat semua...</button>
        </div>
    </div>
</div>

<style>
    .card {
        @apply rounded-3xl p-6 shadow-lg shadow-gray-300;
    }
</style>
