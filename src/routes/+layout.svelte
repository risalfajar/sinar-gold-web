<script lang="ts">
    import "../app.pcss"
    import {onMount} from "svelte"
    import {Modal, ProgressRadial, Toast} from "@skeletonlabs/skeleton"
    import {debounce} from "lodash-es"
    import {page} from '$app/stores'
    import {goto} from '$app/navigation'
    import {listenUser} from "$lib/auth/authManager"
    import type {User} from "firebase/auth"

    const debounceVerify = debounce(verifyAccess, 300)

    let user: User | null
    let isLoading: boolean = true

    $: debounceVerify(user, $page.url)

    onMount(() => listenUser(value => user = value))

    function verifyAccess(user: User | null, url) {
        const isLoggedIn = user != null
        const path = url.pathname

        if (path.includes("/dashboard") && !isLoggedIn)
            goto('/login')
        else if (path.includes("/login") && isLoggedIn)
            goto('/dashboard')
        else if (path === "/")
            if (isLoggedIn)
                goto('/dashboard')
            else
                goto('/login')

        isLoading = false
    }
</script>

<Modal background="bg-white" rounded="rounded-xl" regionHeader="text-xl font-bold"/>
<Toast buttonDismiss="btn-ringed-surface"/>

{#if isLoading}
    <div class="w-screen h-screen flex justify-center items-center">
        <ProgressRadial class="w-16"/>
    </div>
{:else }
    <slot></slot>
{/if}
