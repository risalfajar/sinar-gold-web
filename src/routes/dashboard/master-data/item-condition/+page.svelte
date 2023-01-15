<script lang="ts">
    import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import ItemConditionRepository from "$lib/master-data/item-condition/itemConditionRepository"

    const repository = new ItemConditionRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="condition" editDialog={EditDialog}/>
