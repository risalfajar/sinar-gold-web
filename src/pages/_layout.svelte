<script lang="ts">
    import {onMount} from "svelte"
    import {listenUser} from "src/lib/auth/authManager"
    import {isActive, redirect} from "@roxi/routify"
    import {Toast} from "@skeletonlabs/skeleton"

    onMount(() => listenUser(user => {
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
    }))
</script>

<Toast/>
<slot></slot>
