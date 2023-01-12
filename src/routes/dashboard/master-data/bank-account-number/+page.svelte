<script lang="ts">
    import MasterDataPage from "../MasterDataPage.svelte"
    import {schema} from "./schema.ts"
    import EditDialog from "./EditDialog.svelte"
    import BankAccountNumberRepository from "$lib/master-data/bank-account-number/bankAccountNumberRepository"

    const repository = new BankAccountNumberRepository()
</script>

<MasterDataPage {repository} {schema} initialSortKey="number" editDialog={EditDialog}/>
