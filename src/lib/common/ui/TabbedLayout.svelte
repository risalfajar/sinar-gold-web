<script lang="ts">
    import Container from "$lib/common/ui/container/Container.svelte"
    import ContainerTitle from "$lib/common/ui/container/ContainerTitle.svelte"
    import {findMenu} from "$lib/dashboard/menus"
    import TabbedContainer from "$lib/common/ui/container/tab/TabbedContainer.svelte"
    import {page} from "$app/stores"

    const menu = findMenu($page.route.id!)
</script>

<Container>
    <ContainerTitle slot="title" title={$menu.title}/>
    <TabbedContainer tabs={$menu.subMenus}>
        <slot/>
    </TabbedContainer>
</Container>
