<script lang="ts">
    import MasterDataPage from "$lib/master-data/MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import TransactionCodeRepository from "$lib/master-data/transaction-code/transactionCodeRepository"

    const repository = new TransactionCodeRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="code" editDialog={EditDialog}/>
