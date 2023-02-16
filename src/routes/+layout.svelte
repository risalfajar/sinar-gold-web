<script lang="ts">
    import "../app.pcss"
    import {onMount} from "svelte"
    import {ProgressRadial, Toast} from "@skeletonlabs/skeleton"
    import {debounce} from "lodash-es"
    import {page} from '$app/stores'
    import {goto} from '$app/navigation'
    import {getRole, listenUser} from "$lib/common/auth/authManager"
    import type {User} from "firebase/auth"
    import Modal from "$lib/common/ui/dialog/Modal.svelte"
    import {Role} from "$lib/users/types/role"

    const debounceVerify = debounce(verifyAccess, 300)

    let user: User | null
    let isLoading: boolean = true

    $: debounceVerify(user, $page.url)

    onMount(() => listenUser(value => user = value))

    async function verifyAccess(user: User | null, url) {
        const isLoggedIn = user != null
        const isCraftsman = await getRole() === Role.CRAFTSMAN
        const path = url.pathname

        if (!isLoggedIn && !path.includes('/login'))
            await goto('/login')
        else if (isCraftsman && !path.includes('/craftsman'))
            await goto('/craftsman')
        else if (isLoggedIn && !isCraftsman && !path.includes('/dashboard'))
            await goto('/dashboard')

        isLoading = false
    }
</script>

<Toast buttonDismiss="variant-ringed-surface"/>
<Modal background="bg-white"
       rounded="rounded-xl"
       regionHeader="text-xl font-bold"
       regionBody="font-semibold text-center text-lg py-4"
       buttonNeutral="border-2 border-secondary-500 font-bold"
       buttonPositive="variant-filled-primary font-bold"/>

{#if isLoading}
    <div class="w-screen h-screen flex justify-center items-center">
        <ProgressRadial class="w-16"/>
    </div>
{:else }
    <slot></slot>
{/if}
