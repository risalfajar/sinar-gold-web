<script lang="ts">
    import Container from "$lib/common/ui/container/Container.svelte"
    import ContainerTitle from "$lib/common/ui/container/ContainerTitle.svelte"
    import {findSubMenus} from "$lib/dashboard/menus"
    import TabbedContainer from "$lib/common/ui/container/tab/TabbedContainer.svelte"

    const title = 'Data Master'
    const tabs = findSubMenus(title)
</script>

<Container>
    <ContainerTitle slot="title" {title}/>
    <TabbedContainer tabs={$tabs}>
        <slot/>
    </TabbedContainer>
</Container>
