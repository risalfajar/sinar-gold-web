<script lang="ts">
    import MasterDataPage from "../MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import StoreRepository from "$lib/master-data/store/storeRepository"

    const repository = new StoreRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="name" editDialog={EditDialog}/>
