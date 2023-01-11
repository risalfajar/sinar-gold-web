<script lang="ts">
    import MasterDataPage from "../MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import GiftRepository from "$lib/master-data/gift/giftRepository"

    const repository = new GiftRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="code" editDialog={EditDialog}/>
