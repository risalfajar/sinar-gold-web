<script lang="ts">
    import Container from "$lib/common/ui/container/Container.svelte"
    import ContainerTitle from "$lib/common/ui/container/ContainerTitle.svelte"
    import {menus} from "$lib/dashboard/menus"
    import {useConveyer} from "@egjs/svelte-conveyer"
    import {goto} from "$app/navigation"
    import {page} from "$app/stores"
    import ContainerCard from "$lib/common/ui/container/ContainerCard.svelte"

    const tabs = menus.find(it => it.title === 'Berlian').subMenus
    const {ref} = useConveyer({useSideWheel: true})

    $: activeTab = tabs.find(it => $page.route.id === it.link)
</script>

<Container>
    <ContainerTitle slot="title" title="Data Berlian" icon="Berlian"/>
    <!--  TODO extract tabbed container  -->
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
</Container>
