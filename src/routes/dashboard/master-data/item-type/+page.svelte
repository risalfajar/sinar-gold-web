<script lang="ts">
    import MasterDataPage from "../MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import ItemTypeRepository from "$lib/master-data/item-type/itemTypeRepository"

    const repository = new ItemTypeRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="name" editDialog={EditDialog}/>
