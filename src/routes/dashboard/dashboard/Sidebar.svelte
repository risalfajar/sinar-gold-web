<script lang="ts">
    import AppLogo from "$lib/ui/AppLogo.svelte"
    import Icon from "$lib/ui/icon/Icon.svelte"
    import {AccordionItem} from "@skeletonlabs/skeleton"
    import {fly} from "svelte/transition"
    import {menus} from "./data/menus.js"
    import {goto} from "$app/navigation"

    let isExpanded = true
</script>

<div class="flex flex-col h-screen items-center gap-4 bg-secondary-500 p-6 rounded-r-3xl transition-width {isExpanded ? 'w-[20em]' : 'w-[6em]'}">
    {#key isExpanded}
        <div class="w-full flex flex-row justify-center items-center gap-2" in:fly={{x: 100}}>
            <AppLogo class="flex-none"/>
            {#if isExpanded}
                <div class="w-full">
                    <p class="font-black">Beranda</p>
                    <p>Sinar Gold</p>
                </div>
            {/if}
        </div>
    {/key}

    {#key isExpanded}
        <div id="sidebar-content" class="w-full flex flex-col flex-grow overflow-y-auto gap-2" in:fly={{x: 100}}>
            {#each menus as menu (menu.title)}
                {#if isExpanded}
                    {#if menu.subMenus?.length > 0}
                        <AccordionItem regionSummary="py-2 px-5 [&>div>svg]:!fill-white [&>div>svg]:!opacity-100"
                                       regionContent="pl-9 py-1"
                                       rounded="rounded-lg"
                                       hover="transition-colors duration-150 hover:bg-primary-400 ">
                            <Icon slot="lead" name={menu.title}/>
                            <span slot="summary" class="font-semibold -m-1">{menu.title}</span>
                            <div slot="content" class="space-y-2">
                                {#each menu.subMenus as subMenu (subMenu.title)}
                                    <button class="w-full btn py-1 !justify-start hover:bg-primary-400" on:click={() => goto(subMenu.link)}>
                                        <span class="font-semibold">{subMenu.title}</span>
                                    </button>
                                {/each}
                            </div>
                        </AccordionItem>
                    {:else}
                        <button class="btn !justify-start hover:bg-primary-400" on:click={() => goto(menu.link)}>
                            <Icon name={menu.title}/>
                            <span class="pl-1 font-semibold">{menu.title}</span>
                        </button>
                    {/if}
                {:else }
                    <button class="btn btn-icon p-0" on:click={() => goto(menu.link)}>
                        <Icon name={menu.title}/>
                    </button>
                {/if}
            {/each}
        </div>
    {/key}

    <button class="btn-icon btn-filled-primary" on:click={() => isExpanded = !isExpanded}>
        <i class="material-icons text-secondary-500 transition-all duration-300" class:rotate-180={isExpanded}>chevron_right</i>
    </button>
</div>

<style>
    p, span {
        @apply text-white;
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    #sidebar-content::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    #sidebar-content {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
</style>
