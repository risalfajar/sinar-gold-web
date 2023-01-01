<script lang="ts">
    import {onMount} from "svelte"
    import {listenUser} from "src/lib/auth/authManager"
    import {isActive, redirect, url} from "@roxi/routify"
    import {ProgressRadial} from "@skeletonlabs/skeleton"
    import {User} from "firebase/auth"
    import {debounce} from "lodash-es"

    const debounceVerify = debounce(verifyAccess, 300)

    let user: User | null
    let isLoading: boolean = true

    $: debounceVerify(user, $url())

    onMount(() => listenUser(value => user = value))

    function verifyAccess(user: User | null, url: string) {
        const isLoggedIn = user != null

        if ($isActive("/dashboard") && !isLoggedIn)
            $redirect('/login')
        else if ($isActive("/login") && isLoggedIn)
            $redirect('/dashboard')
        else if ($isActive("/", {}, {strict: false}))
            if (isLoggedIn)
                $redirect('/dashboard')
            else
                $redirect('/login')

        isLoading = false
    }
</script>

{#if isLoading}
    <div class="w-screen h-screen flex justify-center items-center">
        <ProgressRadial class="w-16"/>
    </div>
{:else }
    <slot></slot>
{/if}
