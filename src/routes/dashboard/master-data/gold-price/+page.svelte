<script lang="ts">
    import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"
    import {schema} from "./schema"
    import EditDialog from "./EditDialog.svelte"
    import GoldPriceRepository from "$lib/master-data/gold-price/goldPriceRepository"

    const repository = new GoldPriceRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="groupName" editDialog={EditDialog}/>
