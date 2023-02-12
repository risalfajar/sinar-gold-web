<script lang="ts">
    import {AppShell} from "@skeletonlabs/skeleton"
    import Sidebar from "./dashboard/Sidebar.svelte"
    import {page} from "$app/stores"
    import {derived} from "svelte/store"
    import {currentUser} from "$lib/stores"
    import {menus} from "$lib/dashboard/menus"
    import {SubMenu} from "$lib/dashboard/menu"
    import {goto} from "$app/navigation"

    const allMenus: SubMenu[] = menus.flatMap(menu => menu.subMenus?.length > 0 ? menu.subMenus! : {title: menu.title, link: menu.link ?? ''})
    const userPages = derived(currentUser, (user) => user?.pages ?? [])
    const validMenus = derived(userPages, (pages) => allMenus.filter(menu => pages.includes(menu.title)))
    const publicLinks = ['/dashboard']

    let currentRoute: string
    let isRouteValid: boolean

    $: currentRoute = $page.route.id ?? ''
    $: isRouteValid = publicLinks.includes(currentRoute) || $validMenus.some(menu => currentRoute.includes(menu.link))
</script>

<AppShell>
    <Sidebar slot="sidebarLeft"/>
    <div class="w-full h-full max-w-full max-h-full p-6">
        {#if isRouteValid}
            <slot/>
        {:else}
            <div class="h-full flex flex-col justify-center items-center">
                <h2>Anda tidak diizinkan mengakses halaman ini</h2>
                <button class="mt-8 btn variant-filled-primary" on:click={() => goto('/')}>Kembali</button>
            </div>
        {/if}
    </div>
</AppShell>
