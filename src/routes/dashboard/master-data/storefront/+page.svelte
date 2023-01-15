<script lang="ts">
    import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import StorefrontRepository from "$lib/master-data/storefront/storefrontRepository"

    const repository = new StorefrontRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="code" editDialog={EditDialog}/>
