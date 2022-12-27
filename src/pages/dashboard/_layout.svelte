<script>
    import {AppShell} from "@skeletonlabs/skeleton"
    import Sidebar from "src/features/dashboard/Sidebar.svelte"
</script>

<AppShell>
    <Sidebar slot="sidebarLeft">Sidebar Left</Sidebar>
    <slot/>
</AppShell>
