<script>
    import {AppShell} from "@skeletonlabs/skeleton"
    import Sidebar from "src/features/dashboard/Sidebar.svelte"
</script>

<AppShell>
    <Sidebar slot="sidebarLeft"/>
    <div class="w-full h-full max-w-full max-h-full p-6">
        <slot/>
    </div>
</AppShell>
