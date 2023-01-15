<script lang="ts">
    import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import BankRepository from "$lib/master-data/bank/bankRepository"

    const repository = new BankRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="number" editDialog={EditDialog}/>
