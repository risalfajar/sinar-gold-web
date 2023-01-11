<script lang="ts">
    import MasterDataPage from "../MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import PurchaseConditionRepository from "$lib/master-data/purchase-condition/purchaseConditionRepository"

    const repository = new PurchaseConditionRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="code" editDialog={EditDialog}/>
