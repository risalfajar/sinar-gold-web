<script lang="ts">
    import {SubMenu} from "$lib/dashboard/menu"
    import ContainerCard from "$lib/common/ui/container/ContainerCard.svelte"
    import {useConveyer} from "@egjs/svelte-conveyer"
    import {page} from "$app/stores"
    import {goto} from "$app/navigation"

    const {ref} = useConveyer({useSideWheel: true})

    export let tabs: SubMenu[]

    $: activeTab = tabs.find(it => $page.route.id === it.link)
</script>

<div>
    <div class="w-full flex flex-row gap-1 overflow-x-auto overflow-y-hidden scrollbar-none" use:ref>
        {#each tabs as tab (tab.title)}
            {@const isActive = activeTab === tab}
            <button on:click={() => goto(tab.link)}
                    class:bg-secondary-500={isActive}
                    class:bg-secondary-200={!isActive}
                    class="flex-none h-12 w-32 p-1 rounded-t-xl text-xs text-white font-bold uppercase hover:bg-secondary-400 transition">
                {tab.title}
            </button>
        {/each}
    </div>
    <ContainerCard class="!rounded-t-none" title={activeTab.title}>
        <slot/>
    </ContainerCard>
</div>
