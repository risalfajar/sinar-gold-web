<script lang="ts">
    import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import CashCategoryRepository from "$lib/master-data/cash-category/cashCategoryRepository"

    const repository = new CashCategoryRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="category" editDialog={EditDialog}/>
