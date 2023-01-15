<script lang="ts">
    import Container from "$lib/common/ui/container/Container.svelte"
    import ContainerTitle from "$lib/common/ui/container/ContainerTitle.svelte"
    import {menus} from "$lib/dashboard/menus"
    import TabbedContainer from "$lib/common/ui/container/tab/TabbedContainer.svelte"

    const tabs = menus.find(it => it.title === 'Data Master').subMenus
</script>

<Container>
    <ContainerTitle slot="title" title="Data Master"/>
    <TabbedContainer {tabs}>
        <slot/>
    </TabbedContainer>
</Container>
